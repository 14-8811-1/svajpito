import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, x, y, fill, value) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;

    this.p = 76 / 100;
    this.value = value;

    this.fill = fill;

    this.draw();

    scene.add.existing(this.bar);
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  setHealth(value) {
    this.value = value;
    this.draw();
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    //  Health
    this.bar.fillStyle(this.fill);
    this.bar.fillRect(this.x + 2, this.y + 2, this.p * 100, 12);

    var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }
}
