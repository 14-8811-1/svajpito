import "phaser";
import { triggerEvent } from "../../common/communication-helper";
import HealthBar from "../overlay/health-bar";

const HEALTH_DECREASE = 10;

const HEALTH_BAR_FILL = 0x00ff00;
const HEALTH_BAR_OFFSET_X = -40;
const HEALTH_BAR_OFFSET_Y = -50;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, playerInfo = { uuIdentity: "0-0", health: 100 }) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.previousPosition = {};
    this.uuIdentity = playerInfo.uuIdentity;
    this.isAlive = true;

    scene.physics.add.collider(this, scene.othersBullets, (player, bullet) => {
      bullet.destroy();

      this.health = Math.max(this.health - HEALTH_DECREASE, 0);
      this.healthBar.setHealth(this.health);

      if (this.health === 0) {
        this.die();
      }

      return false;
    });

    this.depth = 0;

    this.healthBar = new HealthBar(
      scene,
      this.x + HEALTH_BAR_OFFSET_X,
      this.y + HEALTH_BAR_OFFSET_Y,
      HEALTH_BAR_FILL,
      this.health
    );
  }

  die() {
    this.isAlive = false;

    this.destroy();

    console.log("trigger playerDead");
    triggerEvent("playerDead");

    this.healthBar.destroy();
  }

  updateMovement(cursors) {
    if (this.isAlive) {
      // Move left
      if (cursors.left.isDown) {
        this.setVelocityX(-360);

        if (this.previousPosition && this.previousPosition.velocityX !== -360) {
          triggerEvent("playerMovement_", {
            x: this.x,
            y: this.y,
            velocityX: -360,
          });
        }
        this.velocityX = -360;
        if (this.body.touching.down) {
          this.play("left", true);
        }
      }
      // Move right
      else if (cursors.right.isDown) {
        this.setVelocityX(360);

        if (this.previousPosition && this.previousPosition.velocityX !== 360) {
          triggerEvent("playerMovement_", {
            x: this.x,
            y: this.y,
            velocityX: 360,
          });
        }
        this.velocityX = 360;

        if (this.body.touching.down) {
          this.play("right", true);
        }
      }
      // Neutral (no movement)
      else {
        this.setVelocityX(0);
        if (this.previousPosition && this.previousPosition.velocityX !== 0) {
          triggerEvent("playerMovement_", {
            x: this.x,
            y: this.y,
            velocityX: 0,
          });
        }
        this.velocityX = 0;
        this.play("turn", true);
      }
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      // if (this.previousPosition && this.previousPosition.velocityY !== -800) {
      triggerEvent("playerMovement_", {
        x: this.x,
        y: this.y,
        velocityY: -800,
      });
      // }
      this.velocityY = -800;
      jumpSound.play();
      if (cursors.right.isDown) {
        this.play("rightJump", true);
      } else if (cursors.left.isDown) {
        this.play("leftJump", true);
      }
    }
  }

  update(cursors, jumpSound) {
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);
    if (this.previousPosition.x) {
      if (Math.abs(this.x - this.previousPosition.x) > 5 || Math.abs(this.y - this.previousPosition.y) > 5) {
        console.log(this.x, this.y, "trigger moved");
        triggerEvent("playerMovement", {
          x: this.x,
          y: this.y,
          velocityY: this.velocityY,
          velocityX: this.velocityX,
          rotation: 0,
        });
      }
    }
    this.previousPosition = { x: this.x, y: this.y, velocityY: this.velocityY, velocityX: this.velocityX };
    this.healthBar.setPos(this.x + HEALTH_BAR_OFFSET_X, this.y + HEALTH_BAR_OFFSET_Y);
    // console.log(this);
    // console.log("a");
    // debugger;
  }
}
