"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/elo-error.js").List;
const PageInfoHelper = require("../../helpers/page-info-helper");

const WARNINGS = {
  listUnsupportedKeys: {
    code: `${Errors.UC_CODE}unsupportedKeys`,
  },
};

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("elo");
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("eloListDtoInType", dtoIn);
    //A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    dtoIn.pageInfo = PageInfoHelper.getDefaultPageInfo(dtoIn.pageInfo);
    let dtoOut = await this.dao.list(awid, dtoIn.pageInfo);

    return { ...dtoOut, uuAppErrorMap };
  }
}

module.exports = new ListAbl();
