"use strict";

const Errors = require("../../api/errors/room-error").Start;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

class StartAbl {
  async start(uri, dtoIn, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    ValidationHelper.processValidation({
      dtoIn,
      validationSchema: "roomStartDtoInType",
      Errors,
      uuAppErrorMap,
    });

    let roomInstance = new Room({ Errors, uri });
    let roomData = await roomInstance.start({}, uuAppErrorMap);

    return { ...roomData, uuAppErrorMap };
  }
}

module.exports = new StartAbl();
