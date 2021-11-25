import "phaser";
import HealthBar from "../overlay/health-bar";

const HEALTH_BAR_FILL = 0xff0000;
const HEALTH_BAR_OFFSET_X = -40;
const HEALTH_BAR_OFFSET_Y = -50;

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, playerInfo) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setPushable(false);

    this.uuIdentity = playerInfo.uuIdentity;
    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);

    this.health = playerInfo.health ?? 100;

    this.healthBar = new HealthBar(
      scene,
      this.x + HEALTH_BAR_OFFSET_X,
      this.y + HEALTH_BAR_OFFSET_Y,
      HEALTH_BAR_FILL,
      this.health,
      this.uuIdentity
    );
  }

  setPosition(x, y) {
    super.setPosition(x, y);
    this.healthBar?.setPos(x + HEALTH_BAR_OFFSET_X, y + HEALTH_BAR_OFFSET_Y);
  }

  setHealth(value) {
    console.log("setHealth", this.uuIdentity, value);
    this.health = value;
    this.healthBar.setHealth(this.health);
  }

  destroy() {
    this.healthBar?.destroy();
    super.destroy();
  }
}
