"use strict";
const SvajpitoMainAbl = require("../../abl/svajpito-main-abl.js");

class SvajpitoMainController {
  init(ucEnv) {
    return SvajpitoMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SvajpitoMainController();
