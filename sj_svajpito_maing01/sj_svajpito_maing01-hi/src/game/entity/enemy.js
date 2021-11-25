import "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, playerInfo) {
    super(scene, x, y, spriteKey);
    this.uuIdentity = playerInfo.uuIdentity;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    //this.positionBuffer = [];
    //this.interpolationPos = [];
    //this.interpolation = 0;

    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);
    this.updatePlayerInfo(playerInfo);
    // this.setTint(0xff0000);
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

    //this.setVelocityX(velocityX || 0);
    //this.setVelocityY(velocityY || 0);
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
