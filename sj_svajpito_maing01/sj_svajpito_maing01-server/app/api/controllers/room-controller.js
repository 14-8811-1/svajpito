"use strict";
const { CreateAbl, ListAbl, GetAbl, JoinAbl, StartAbl } = require("../../abl/room");

class RoomController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return GetAbl.get(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  join(ucEnv) {
    return JoinAbl.join(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  start(ucEnv) {
    return StartAbl.start(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new RoomController();
