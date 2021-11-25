import "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, playerInfo) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.uuIdentity = playerInfo.uuIdentity;
    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);
    // this.setTint(0xff0000);
  }
}
