import "phaser";
import HealthBar from "../overlay/health-bar";

const HEALTH_BAR_FILL = 0xff0000;
const HEALTH_BAR_OFFSET_X = -40;
const HEALTH_BAR_OFFSET_Y = -50;

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, playerInfo) {
    super(scene, x, y, spriteKey);
    this.uuIdentity = playerInfo.uuIdentity;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setPushable(false);
    this.velocityX = 0;
    this.velocityY = 0;

    //this.positionBuffer = [];
    //this.interpolationPos = [];
    //this.interpolation = 0;

    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);
    this.updatePlayerInfo(playerInfo);
    // this.setTint(0xff0000);

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

  setVelocity(x, y) {
    this.velocityX = x;
    this.velocityY = y;
    this.setVelocityX(x);
    this.setVelocityY(y);
  }

  updatePlayerInfo({ x, y, velocityX, velocityY }) {
    this.setPosition(x || this.x, y || this.y);

    console.log({ velocityX, velocityY });

    // Move left
    if (velocityX < 0 && this.body.touching.down) {
      this.anims.play("left", true);
    }
    // Move right
    else if (velocityX > 0 && this.body.touching.down) {
      this.anims.play("right", true);
    }
    // Neutral (no movement)
    else if (velocityX === 0) {
      this.anims.play("turn", true);
    }

    this.setVelocity(velocityX || 0, velocityY || 0);
  }

  update() {
    this.healthBar.setPos(this.x + HEALTH_BAR_OFFSET_X, this.y + HEALTH_BAR_OFFSET_Y);
  }

  /*
  // INTERPOLATION

  bufferPosition(pos) {
    this.positionBuffer.unshift(pos);
  }

  getBufferPositions() {
    let positions = false;
    if(this.positionBuffer.length >= 3) {
      positions = this.positionBuffer.slice(-3, -1)
      positions.push(this.positionBuffer.pop())

      console.log(positions)
      console.log("----------")
    }
    return positions;
  }


  update(time, delta) {
    //console.log(this.positionBuffer)

    const lastPositions = this.getBufferPositions();
    if (lastPositions) {
      this.interpolationPos = lastPositions
      this.interpolation = 0;
    }
    if(this.interpolationPos.length && this.interpolation < 1){
      let [last, second, first] = this.interpolationPos
      console.log(lastPositions)
      let xPoints = [first[0], last[0]];
      let yPoints = [first[1], last[1]];
      let newX = Phaser.Math.Interpolation.Linear(xPoints, this.interpolation);
      let newY = Phaser.Math.Interpolation.Linear(yPoints, this.interpolation);
      this.interpolation += 0.005 * delta;

      console.log({delta,newpos: [newX, newY]})
      this.setPosition(newX, newY);
    }else if(this.interpolation >= 1){
      if(this.positionBuffer.length){
        const lastPos = this.positionBuffer[0];
        this.setPosition(lastPos[0], lastPos[1]);
      }
    }
  }
  */
}
