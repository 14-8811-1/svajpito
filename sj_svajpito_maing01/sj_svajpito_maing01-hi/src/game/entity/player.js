import "phaser";
import { triggerEvent } from "../../common/communication-helper";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, playerInfo = { uuIdentity: "0-0" }) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.uuIdentity = playerInfo.uuIdentity;
    this.isAlive = true;
    this.previousPosition = {};

    scene.physics.add.collider(this, scene.othersBullets, (player, bullet) => {
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

    this.depth = 0;
  }

  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360);
      if (this.body.touching.down) this.play("left", true);
    }
    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(360);
      if (this.body.touching.down) this.play("right", true);
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      this.play("turn", true);
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      jumpSound.play();
      this.setVelocityY(-800);
    }
  }

  update(cursors, jumpSound) {
    if (this.isAlive) {
      this.updateMovement(cursors);
      this.updateJump(cursors, jumpSound);
    }
    if (this.previousPosition.x) {
      if (
        Math.abs(this.x - this.previousPosition.x) > 0 ||
        Math.abs(this.y - this.previousPosition.y) > 0 ||
        Math.abs(this.setVelocityX - this.previousPosition.velocityX) > 0
      ) {
        //console.log(this.x, this.y, "trigger moved");
        triggerEvent("playerMovement", {
          x: this.x,
          y: this.y,
          velocityY: this.velocityY || 0,
          velocityX: this.velocityX || 0,
          rotation: 0,
        });
      }
    }
    this.previousPosition = { x: this.x, y: this.y, velocityY: this.velocityY, velocityX: this.velocityX };
    // console.log(this);
    // console.log("a");
    // debugger;
  }
}
