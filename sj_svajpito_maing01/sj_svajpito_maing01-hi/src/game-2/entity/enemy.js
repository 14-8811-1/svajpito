import "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, playerInfo) {
    super(scene, x, y, texture);
    console.log("other player ", playerInfo);
    this.uuIdentity = playerInfo.uuIdentity;
    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);
    this.setTint(0xff0000);

    scene.add.existing(this);
  }
}
