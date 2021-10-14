"use strict";

const gameStorage = require("../../conponents/game-storage");
const Errors = require("../../api/errors/game-error").Update;

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

    let uuIdentity = session.getIdentity().getUuIdentity();
    let gameId = dtoIn.data.gameId;
    let gameRoom = gameStorage.getGame({ awid, gameId });
    if (dtoIn.identifier === "playerMovement") {
      // players[socket.id].x = movementData.x;
      // players[socket.id].y = movementData.y;
      // players[socket.id].rotation = movementData.rotation;
      // // emit a message to all players about the player that moved
      // socket.broadcast.emit('playerMoved', players[socket.id]);
      let player = gameRoom.getPlayer(uuIdentity);
      player.setPosition(dtoIn.data.x, dtoIn.data.y);
      player.setRotation(dtoIn.data.rotation);

      gameRoom.sendPlayerUpdate(player, gameId, "playerMoved");
    }

    return { uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
