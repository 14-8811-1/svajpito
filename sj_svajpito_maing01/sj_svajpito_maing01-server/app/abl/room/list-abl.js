"use strict";

const Errors = require("../../api/errors/room-error").List;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

class ListAbl {
  async list(uri, dtoIn, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    ValidationHelper.processValidation({
      dtoIn,
      validationSchema: "roomListDtoInType",
      Errors,
      uuAppErrorMap,
    });

    let roomInstance = new Room({ Errors, uri });
    let roomData = await roomInstance.list({ state: dtoIn.sate }, uuAppErrorMap);

    return { ...roomData, uuAppErrorMap };
  }
}

module.exports = new ListAbl();
