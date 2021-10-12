"use strict";
const { UpdateAbl } = require("../../abl/game");

class GameController {
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new GameController();
