const pickSpawnPoint = require("../helpers/spawner");

class Star {
  constructor({ position = {} } = {}) {
    let radomSpawn = pickSpawnPoint();
    this._x = position.x || radomSpawn.x;
    this._y = position.y || radomSpawn.y;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  getStarInfo() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  getPosition() {
    return {
      x: this._x,
      y: this._y,
    };
  }
}

module.exports = Star;
