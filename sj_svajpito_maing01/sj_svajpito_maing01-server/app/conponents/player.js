const STATES = {
  READY: "ready",
  ACTIVE: "active",
  FINAL: "final",
};

class Player {
  constructor({ name, uuIdentity, client, position = {}, rotation }) {
    this._name = name;
    this._uuIdentity = uuIdentity;
    this._client = client;
    this._state = STATES.READY;
    this._score = 0;
    this._x = position.x || Math.floor(Math.random() * 700) + 50;
    this._y = position.y || Math.floor(Math.random() * 500) + 50;
    this._team = Math.floor(Math.random() * 2) === 0 ? "red" : "blue";
    this._color = Math.floor(Math.random() * 16777215).toString(16);
    this._rotation = rotation;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setRotation(rotation) {
    this._rotation = rotation;
  }

  getPlayerInfo() {
    return {
      name: this._name,
      uuIdentity: this._uuIdentity,
      state: this._state,
      score: this._score,
      x: this._x,
      y: this._y,
      rotation: this._rotation,
      team: this._team,
    };
  }

  increaseScore(points) {
    this._score += points;
  }

  setScore(score) {
    this._score = score;
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
