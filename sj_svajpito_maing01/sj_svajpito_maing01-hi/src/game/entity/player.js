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
    this.setPushable(false);

    this.uuIdentity = playerInfo.uuIdentity;
    this.isAlive = true;

    // super powers
    this.isImmortal = false;
    this.speedMultiply = 1;
    this.canShot = true;
    this.canMove = true;

    this.previousPosition = {};
    this.health = playerInfo.health;

    this.sounds = {};
    this.sounds.jump = sounds.jump.pick();
    this.sounds.death = sounds.death;

    scene.physics.add.collider(this, scene.othersBullets, (player, bullet) => {
      if (!this.isImmortal) {
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
      }
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

  setImmortal() {
    this.isImmortal = true;
    console.log("you are immortal");
    setTimeout(() => {
      this.isImmortal = false;
      console.log("you are mortal again");
    }, 5000);
  }

  setSpeedBoost() {
    this.speedMultiply = 3;
    console.log("you are super fast");
    setTimeout(() => {
      this.speedMultiply = 1;
      console.log("you are slow again");
    }, 5000);
  }

  cantShot() {
    this.canShot = false;
    setTimeout(() => {
      this.canShot = true;
      this.scene.alertText.update("");
      console.log("you can shoot again");
    }, 5000);
  }

  cantMove() {
    this.canMove = false;
    setTimeout(() => {
      this.canMove = true;
      this.scene.alertText.update("");
      console.log("you can move again");
    }, 5000);
  }

  die(killerUuIdentity) {
    this.isAlive = false;

    this.destroy();
    this.sounds.death.play({ volume: 0.5 });

    console.log("trigger playerDead");
    triggerEvent("playerDead", { killerUuIdentity });
  }

  updateMovement(cursors) {
    if (this.canMove) {
      // Move left
      if (cursors.left.isDown) {
        this.setVelocityX(-360 * this.speedMultiply);
        this.velocityX = -360 * this.speedMultiply;
        if (this.body.touching.down) this.play("left", true);
      }
      // Move right
      else if (cursors.right.isDown) {
        this.setVelocityX(360 * this.speedMultiply);
        this.velocityX = 360 * this.speedMultiply;
        if (this.body.touching.down) this.play("right", true);
      }
      // Neutral (no movement)
      else {
        this.setVelocityX(0);
        this.velocityX = 0;
        this.play("turn", true);
      }
    } else {
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
    this.previousPosition = { x: this.x, y: this.y, velocityY: this.velocityY, velocityX: this.velocityX };cccccctbbbcgdivrkjfijdcueliuecjekhuglvkvijbr
    
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
