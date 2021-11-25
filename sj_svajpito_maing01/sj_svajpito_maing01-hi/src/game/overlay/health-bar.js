import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, x, y, fill, value, uuIdentity) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;

    this.p = 76 / 100;
    this.value = value;

    this.tag = new Phaser.GameObjects.Text(scene, x, y, uuIdentity, { align: "center", fixedWidth: this.p * 100 - 4, fixedHeight: 12, fontSize: 8, stroke: "#000", fill: "#000" });

    this.fill = fill;
    this.uuIdentity = uuIdentity;

    this.draw();

    scene.add.existing(this.bar);
    scene.add.existing(this.tag);
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

    //  border
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.p * 100, 16);

    //  BG
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.p * 100 - 4, 12);

    // Health
    this.bar.fillStyle(this.fill);
    var d = Math.floor(this.p * this.value) - 4;
    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);

    // Tag
    this.tag.setPosition(this.x + 2, this.y + 2 + 2);
  }

  destroy() {
    this.bar.destroy();
    this.tag.destroy();
  }
}
