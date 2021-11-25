const STATES = {
  READY: "ready",
  ACTIVE: "active",
  FINAL: "final",
};

class Player {
  constructor({ name, uuIdentity, client, position = {}, rotation }) {
    this._name = name;
    this._isAlive = true;
    this._uuIdentity = uuIdentity;
    this._client = client;
    this._state = STATES.READY;
    this._score = 0;
    this._x = position.x || Math.floor(Math.random() * 700) + 50;
    this._y = position.y || Math.floor(Math.random() * 500) + 50;
    this._velocityX = 0;
    this._velocityY = 0;
    this._team = Math.floor(Math.random() * 2) === 0 ? "red" : "blue";
    this._color = Math.floor(Math.random() * 16777215).toString(16);
    this._rotation = rotation;
    this._health = 100;
  }

  reset({ position = {}, rotation }) {
    this._isAlive = true;
    this._state = STATES.READY;
    this._x = position.x || Math.floor(Math.random() * 700) + 50;
    this._y = position.y || Math.floor(Math.random() * 500) + 50;
    this._velocityX = 0;
    this._velocityY = 0;
    this._team = Math.floor(Math.random() * 2) === 0 ? "red" : "blue";
    this._color = Math.floor(Math.random() * 16777215).toString(16);
    this._rotation = rotation;
    this._health = 100;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setVelocity(x, y) {
    this._velocityX = x;
    this._velocityY = y;
  }

  setRotation(rotation) {
    this._rotation = rotation;
  }

  IsAlive() {
    return this._isAlive;
  }

  setAlive(value) {
    this._isAlive = value;
  }

  getPlayerInfo() {
    return {
      name: this._name,
      uuIdentity: this._uuIdentity,
      state: this._state,
      score: this._score,
      x: this._x,
      y: this._y,
      velocityX: this._velocityX,
      velocityY: this._velocityY,
      rotation: this._rotation,
      team: this._team,
      health: this._health,
    };
  }

  increaseScore(points) {
    this._score += points;
  }

  setScore(score) {
    this._score = score;
  }

  getScore() {
    return this._score;
  }

  setHealth(health) {
    this._health = health;
  }

  getHealth() {
    return this._health;
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
