"use strict";
const SseAbl = require("../../abl/sse-abl");

class SseController {
  listen(ucEnv) {
    return SseAbl.listen(ucEnv.getResponse());
  }

  send(ucEnv) {
    return SseAbl.send(ucEnv.getDtoIn());
  }
}

module.exports = new SseController();
