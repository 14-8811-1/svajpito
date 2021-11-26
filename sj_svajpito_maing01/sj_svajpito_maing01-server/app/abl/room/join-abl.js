"use strict";

const GameRoom = require("../../conponents/game-room");
const gameStorage = require("../../conponents/game-storage");
const pickSpawnPoint = require("../../helpers/spawner");

class JoinAbl {
  constructor() {}

  async join(uri, dtoIn, response, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    let roomId = dtoIn.roomId;
    let gameRoom = this.getGameRoom(awid, roomId);

    let uuIdentity = session.getIdentity().getUuIdentity();
    let name = session.getIdentity().getName();

    let player = gameRoom.addPlayer({
      name,
      uuIdentity,
      client: response,
      ...pickSpawnPoint(),
    });

    gameRoom.sendPlayerUpdate(player, roomId, "newPlayer");

    let data = [
      {
        identifier: "initialGameState",
        data: gameRoom.getGameRoomInfo(),
      },
      {
        identifier: "starLocation",
        data: gameRoom.getStar().getStarInfo(),
      },
    ];
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache,no-transform");
    response.setHeader("Connection", "keep-alive");
    response.setBody(`data: ${JSON.stringify(data)}\n\n`);
    response.unwrap().on("close", () => this.removePlayer(gameRoom, uuIdentity));
    response.unwrap().on("end", () => this.removePlayer(gameRoom, uuIdentity));
  }

  removePlayer(gameRoom, uuIdentity) {
    console.error("DISCONNECTED");
    let player = gameRoom.removePlayer(uuIdentity);
    gameRoom.sendPlayerUpdate(player, gameRoom.getId(), "disconnect");
  }

  getGameRoom(awid, roomId) {
    let gameRoom = gameStorage.getGame({ awid, gameId: roomId });
    if (!gameRoom) {
      gameRoom = new GameRoom(roomId, awid);
      gameStorage.addGame({ awid, gameRoom });
    }
    return gameRoom;
  }
}

module.exports = new JoinAbl();
