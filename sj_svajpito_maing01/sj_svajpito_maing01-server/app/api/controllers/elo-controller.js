"use strict";
const { UpdateAbl, ListAbl } = require("../../abl/elo");

class EloController {
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new EloController();
