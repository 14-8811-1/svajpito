"use strict";
const { CreateAbl, ListAbl, GetAbl, JoinAbl, JoinAbl2, StartAbl } = require("../../abl/room");

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
    return JoinAbl.join(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getResponse(), ucEnv.getSession());
    // return JoinAbl.join(ucEnv.getResponse());
  }
  join2(ucEnv) {
    return JoinAbl2.join(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getResponse(), ucEnv.getSession());
  }
  start(ucEnv) {
    return StartAbl.start(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new RoomController();
