const STATES = {
  READY: "ready",
  ACTIVE: "active",
  FINAL: "final",
}

class Player {
  constructor({ name, uuIdentity, client }) {
    this._name = name;
    this._uuIdentity = uuIdentity;
    this._client = client;
    this._state = STATES.READY;
    this._score = 0;
  }

  getPlayerInfo() {
    return {
      name: this._name,
      uuIdentity: this._uuIdentity,
      state: this._state,
      score: this._score,
    };
  }

  getUuIdentity() {
    return this._uuIdentity;
  }

  getState() {
    return this._state;
  }

  getClient() {
    return this._client;
  }

  inform(identifier, gameId, data) {
    let dtoIn = {
      identifier,
      gameId,
      data,
    };
    this._client.unwrap().write(`data: ${JSON.stringify(dtoIn)}\n\n`);
  }
}

module.exports = Player;
