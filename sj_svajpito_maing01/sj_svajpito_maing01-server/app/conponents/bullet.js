class Bullet {
  constructor({ x, y, angle }, uuIdentity) {
    this._x = x;
    this._y = y;
    this._angle = angle;
    this._uuIdentity = uuIdentity;
  }

  getBulletInfo() {
    return {
      x: this._x,
      y: this._y,
      angle: this._angle,
      uuIdentity: this._uuIdentity,
    };
  }
}

module.exports = Bullet;
