import "phaser";
import { triggerEvent } from "../../common/communication-helper";

export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, playerInfo) {
    super(scene, x, y, texture);
    this.isAlive = true;
    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDrag(100);
    this.setAngularDrag(100);
    this.setMaxVelocity(200);

    scene.physics.add.collider(this, scene.othersBullets, (ship, bullet) => {
      bullet.destroy();
      this.destroy();
      console.log("You are dead");

      if (this.isAlive) {
        this.isAlive = false;
        console.log("trigger playerDead");
        triggerEvent("playerDead");
      }

      return false;
    });
  }
}
