"use strict";

const Errors = require("../../api/errors/room-error").Join;

const instanceChecker = require("../../conponents/instance-checker");
const Room = require("../../conponents/room");
const ValidationHelper = require("../../helpers/validation-helper");

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
    gameStorage.removePlayer(awid, uuIdentity);
    gameRoom.addPlayer({
      name,
      uuIdentity,
      client: response,
    });

    let playerInfoList = gameRoom.getPlayerInfoList();
    let data = {
      identifier: "playerList",
      data: playerInfoList,
    };
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache,no-transform");
    response.setHeader("Connection", "keep-alive");
    response.setBody(`data: ${JSON.stringify(data)}\n\n`);
    response.unwrap().on("close", () => gameRoom.removePlayer(uuIdentity));
    response.unwrap().on("end", () => gameRoom.removePlayer(uuIdentity));

    // return await this.listen(response);
    // let awid = uri.getAwid();
    // await instanceChecker.ensureInstanceAndState(awid, Errors, uuAppErrorMap);
    // ValidationHelper.processValidation({
    //   dtoIn,
    //   validationSchema: "roomListDtoInType",
    //   Errors,
    //   uuAppErrorMap,
    // });
    //
    // let roomInstance = new Room({ Errors, uri });
    // let roomData = await roomInstance.join({}, uuAppErrorMap);
    //
    // return { ...roomData, uuAppErrorMap };
  }

  _removeListener(response) {
    const index = this.players.findIndex((item) => item === response);
    if (index >= 0) {
      console.log("Removing listener at index", index);
      this.players.splice(index, 1);
    }
  }

  async listen(response) {
    //let roomId =
    //this.players.push(response);
    //console.log(this.players);
    // response.setHeader("Content-Type", "text/event-stream");
    // response.setHeader("Cache-Control", "no-cache,no-transform");
    // response.setHeader("Connection", "keep-alive");
    // response.setBody("\n");
    // response.unwrap().on("close", () => this._removeListener(response));
    // response.unwrap().on("end", () => this._removeListener(response));
  }
}

module.exports = new JoinAbl();
