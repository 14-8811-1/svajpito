"use strict";

class SseAbl {
  constructor() {
    this._responses = [];
  }

  _removeListener(response) {
    const index = this._responses.findIndex(item => item === response);
    if (index >= 0) {
      console.log("Removing listener at index", index);
      this._responses.splice(index, 1);
    }
  }

  async listen(response) {
    this._responses.push(response);
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache,no-transform");
    response.setHeader("Connection", "keep-alive");
    response.setBody("\n");
    response.unwrap().on("close", () => this._removeListener(response));
    response.unwrap().on("end", () => this._removeListener(response));
  }

  async send(dtoIn) {
    this._responses.forEach((response) => {
      response.unwrap().write(`data: ${JSON.stringify(dtoIn)}\n\n`);
    });
  }
}

module.exports = new SseAbl();
