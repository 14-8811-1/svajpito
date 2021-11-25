import "phaser";
import { triggerEvent } from "../../common/communication-helper";
import HealthBar from "../overlay/health-bar";

const HEALTH_DECREASE = 10;

const HEALTH_BAR_FILL = 0x00ff00;
const HEALTH_BAR_OFFSET_X = -40;
const HEALTH_BAR_OFFSET_Y = -50;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, playerInfo = { uuIdentity: "0-0", health: 100 }, sounds) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.velocityX = 0;
    this.velocityY = 0;
    this.x = playerInfo.x;
    this.y = playerInfo.y;

    this.uuIdentity = playerInfo.uuIdentity;
    this.isAlive = true;
    this.previousPosition = {};
    this.health = playerInfo.health;

    this.sounds = {};
    this.sounds.jump = sounds.jump.pick();

    scene.physics.add.collider(this, scene.othersBullets, (player, bullet) => {
      bullet.destroy();

      if (!this.isAlive) {
        console.log("Dead and shot?");
        return;
      }

      const damage = bullet.damage ?? HEALTH_DECREASE;

      this.health = Math.max(this.health - damage, 0);
      this.healthBar.setHealth(this.health);

      console.log("trigger playerShot", damage, this.health);
      triggerEvent("playerShot", { shooterUuIdentity: bullet.uuIdentity, damage });

      if (this.health === 0) {
        this.die(bullet.uuIdentity);
      }

      return false;
    });

    this.depth = 0;

    this.healthBar = new HealthBar(
      scene,
      this.x + HEALTH_BAR_OFFSET_X,
      this.y + HEALTH_BAR_OFFSET_Y,
      HEALTH_BAR_FILL,
      this.health,
      this.uuIdentity
    );
  }

  die(killerUuIdentity) {
    this.isAlive = false;

    this.destroy();

    console.log("trigger playerDead");
    triggerEvent("playerDead", { killerUuIdentity });
  }

  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360);
      this.velocityX = -360;
      if (this.body.touching.down) this.play("left", true);
    }
    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(360);
      this.velocityX = 360;
      if (this.body.touching.down) this.play("right", true);
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      this.velocityX = 0;
      this.play("turn", true);
    }
  }

  updateJump(cursors) {
    if (cursors.up.isDown && this.body.touching.down && !this.isJumping) {
      this.isJumping = true;
      this.sounds.jump.play();
      this.setVelocityY(-800);
      this.velocityY = -800;
    } else if (this.body.touching.down) {
      this.velocityY = 0;
      setTimeout(() => {
        this.isJumping = false;
      }, 200);
    }
  }

  update(cursors) {
    if (this.isAlive) {
      this.updateMovement(cursors);
      this.updateJump(cursors);
    }

    if (this.previousPosition.x) {
      if (
        Math.abs(this.velocityY - this.previousPosition.velocityY) > 0 ||
        Math.abs(this.velocityX - this.previousPosition.velocityX) > 0
      ) {
        //console.log(this.x, this.y, "trigger moved");
        console.log(this.velocityX, this.velocityY);
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
    this.healthBar.setPos(this.x + HEALTH_BAR_OFFSET_X, this.y + HEALTH_BAR_OFFSET_Y);

    // console.log(this);
    // console.log("a");
    // debugger;
  }

  destroy() {
    super.destroy();
    this.healthBar.destroy();
  }
}
