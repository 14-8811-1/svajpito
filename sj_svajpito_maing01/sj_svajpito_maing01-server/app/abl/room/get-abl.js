"use strict";

const Errors = require("../../api/errors/room-error").Get;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

class GetAbl {
  async get(uri, dtoIn, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    ValidationHelper.processValidation({
      dtoIn,
      validationSchema: "roomGetDtoInType",
      Errors,
      uuAppErrorMap,
    });

    let roomInstance = new Room({ Errors, uri });
    let roomData = await roomInstance.get({ id: dtoIn.id }, uuAppErrorMap);

    return { ...roomData, uuAppErrorMap };
  }
}

module.exports = new GetAbl();
