"use strict";
const { UpdateAbl, UpdateAbl2 } = require("../../abl/game");

class GameController {
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  update2(ucEnv) {
    return UpdateAbl2.update(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new GameController();
