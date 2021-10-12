"use strict";

const Errors = require("../../api/errors/game-error").Update;

const ValidationHelper = require("../../helpers/validation-helper");

const GameRoom = require("../../conponents/game-room");
const gameStorage = require("../../conponents/game-storage");

class UpdateAbl {
  async update(uri, dtoIn, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    // ValidationHelper.processValidation({
    //   dtoIn,
    //   validationSchema: "roomGetDtoInType",
    //   Errors,
    //   uuAppErrorMap,
    // });
    if (typeof dtoIn.message === "string") {
      dtoIn = JSON.parse(dtoIn.message);
    }

    console.log(dtoIn);

    let gameId = dtoIn.gameId;
    let uuIdentity = session.getIdentity().getUuIdentity();
    let gameRoom = gameStorage.getGame({ awid, gameId }); //this.gameRooms.find((gr) => gr.getId() === roomId);
    if (gameRoom) {
      gameRoom.updatePlayerListScore(dtoIn.data, uuIdentity);
    }

    return { uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
