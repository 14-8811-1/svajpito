import Phaser from "phaser";

export default class Timer {
  constructor(scene) {
    this.scene = scene;
    this.time = 0;
    this.timerText = new Phaser.GameObjects.Text(this.scene, 0, 16, "00:00", { fontSize: "32px", fill: "#000", stroke: "#000", align: "center", fixedWidth: this.scene.cameras.main.worldView.width });
    this.scene.add.existing(this.timerText);
  }

  setTime(time) {
    this.time = time;
    this.draw();
  }

  draw() {
    this.timerText.setPosition(this.scene.cameras.main.worldView.x, this.scene.cameras.main.worldView.y + 16);
    this.timerText.width = this.scene.cameras.main.worldView.width;
    this.timerText.setText(`${this.time < 0 ? "-" : ""}${this._formatNum(Math.floor(Math.abs(this.time / 60))) }:${this._formatNum(Math.abs(this.time % 60))}`);
  }

  _formatNum(num) {
    return num < 10 ? "0" + num : num;
  }
}
