
class Star {

  constructor({ position = {} } = {}) {
    this._x = position.x || Math.floor(Math.random() * 700) + 50;
    this._y = position.y || Math.floor(Math.random() * 500) + 50;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  getStarInfo() {
    return {
      x: this._x,
      y: this._y
    }
  }

  getPosition() {
    return {
      x: this._x,
      y: this._y
    }
  }

}

module.exports = Star;
