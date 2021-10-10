"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const { Config } = require("uu_appg01_server").Utils;
const Errors = require("../api/errors/svajpito-main-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

const logger = LoggerFactory.get("SvajpitoMainAbl");

class SvajpitoMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("svajpitoMain");
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["svajpitoMain"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
        }
        throw e;
      }
    }

    let uuObject = {
      awid,
      state: "active",
    };

    let instance;
    try {
      instance = await this.dao.create(uuObject);
    } catch (e) {
      // if (e instanceof ObjectStoreError) {
      //   throw new Errors.CertificationDaoCreateFailed({ uuAppErrorMap }, e);
      // }
      // throw e;
    }

    // HDS N+1
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      uuAppErrorMap: uuAppErrorMap,
    };
  }

  async load(uri, dtoIn, session, authorizationResult, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    let authorizedProfileList = authorizationResult.getAuthorizedProfileList();
    const asidBaseUri = UriBuilder.parse(uri.toString()).setAwid(Config.get("asid")).setUseCase(null).toString();

    return {
      uuAppErrorMap,
      authorizedProfileList,
      asidBaseUri,
    };
  }
}

module.exports = new SvajpitoMainAbl();
