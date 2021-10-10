"use strict";

const Errors = require("../../api/errors/room-error").Join;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

class JoinAbl {
  async join(uri, dtoIn, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    ValidationHelper.processValidation({
      dtoIn,
      validationSchema: "roomListDtoInType",
      Errors,
      uuAppErrorMap,
    });

    let roomInstance = new Room({ Errors, uri });
    let roomData = await roomInstance.join({}, uuAppErrorMap);

    return { ...roomData, uuAppErrorMap };
  }
}

module.exports = new JoinAbl();
