"use strict";

const GameRoom = require("../../conponents/game-room");
const gameStorage = require("../../conponents/game-storage");

class JoinAbl {
  constructor() {
    // this.gameRooms = [];
  }

  async join(uri, dtoIn, response, session, uuAppErrorMap = {}) {
    // async join(response, uuAppErrorMap = {}) {
    let awid = uri.getAwid();

    let roomId = dtoIn.roomId;
    let gameRoom = gameStorage.getGame({ awid, gameId: roomId }); //this.gameRooms.find((gr) => gr.getId() === roomId);
    if (!gameRoom) {
      gameRoom = new GameRoom(roomId);
      gameStorage.addGame({ awid, gameRoom });
      // this.gameRooms.push(gameRoom);
    }

    let uuIdentity = session.getIdentity().getUuIdentity();
    let name = session.getIdentity().getName();

    let player = gameRoom.addPlayer({
      name,
      uuIdentity,
      client: response,
    });

    gameRoom.sendPlayerUpdate(player, roomId, "newPlayer");

    let data = [
      {
        identifier: "currentPlayers",
        data: gameRoom.getPlayers().map(p => p.getPlayerInfo()),
      },
      // {
      //   identifier: "starLocation",
      //   data: {
      //     x: Math.floor(Math.random() * 700) + 50,
      //     y: Math.floor(Math.random() * 500) + 50,
      //   },
      // },
      // {
      //   identifier: "newPlayer",
      //   data: gameRoom.getPlayer(uuIdentity).getPlayerInfo(),
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
}

module.exports = new JoinAbl();
