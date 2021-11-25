class Bullet {
  constructor({ x, y, angle }) {
    this._x = x;
    this._y = y;
    this._angle = angle;
  }

  getBulletInfo() {
    return {
      x: this._x,
      y: this._y,
      angle: this._angle,
    };
  }
}

module.exports = Bullet;
