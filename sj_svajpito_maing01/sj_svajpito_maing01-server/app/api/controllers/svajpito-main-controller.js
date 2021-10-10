"use strict";
const SvajpitoMainAbl = require("../../abl/svajpito-main-abl.js");

class SvajpitoMainController {
  init(ucEnv) {
    return SvajpitoMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  load(ucEnv) {
    return SvajpitoMainAbl.load(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }
}

module.exports = new SvajpitoMainController();
