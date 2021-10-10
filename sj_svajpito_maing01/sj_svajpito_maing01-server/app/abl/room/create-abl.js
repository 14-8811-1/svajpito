"use strict";

const Errors = require("../../api/errors/room-error").Create;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

class CreateAbl {
  async create(uri, dtoIn, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    ValidationHelper.processValidation({
      dtoIn,
      validationSchema: "roomCreateDtoInType",
      Errors,
      uuAppErrorMap,
    });

    let roomInstance = new Room({ Errors, uri });
    let roomData = await roomInstance.create(
      {
        awid,
        name: dtoIn.name,
        capacity: dtoIn.capacity,
        createdBy: session.getIdentity().getUuIdentity(),
      },
      uuAppErrorMap
    );

    return { ...roomData, uuAppErrorMap };
  }
}

module.exports = new CreateAbl();
