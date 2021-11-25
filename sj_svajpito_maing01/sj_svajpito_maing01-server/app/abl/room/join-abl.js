"use strict";

const GameRoom = require("../../conponents/game-room");
const gameStorage = require("../../conponents/game-storage");

const spawnPoints = [
  [50, 100],
  [80, 10],
  [110, 200],
];
const spawnPointRange = 100;

class JoinAbl {
  constructor() {}

  pickSpawnPoint() {
    let spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    spawnPoint[0] += Math.floor(Math.random() * (spawnPointRange + 1)) - spawnPointRange / 2;
    return { x: spawnPoint[0], y: spawnPoint[1] };
  }

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
      ...this.pickSpawnPoint(),
    });

    gameRoom.sendPlayerUpdate(player, roomId, "newPlayer");

    let data = [
      {
        identifier: "currentPlayers",
        data: gameRoom.getPlayers().map((p) => p.getPlayerInfo()),
      },
      // {
      //   identifier: "starLocation",
      //   data: gameRoom.getStar().getStarInfo(),
      // },
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
      gameRoom = new GameRoom(roomId);
      gameStorage.addGame({ awid, gameRoom });
    }
    return gameRoom;
  }
}

module.exports = new JoinAbl();
