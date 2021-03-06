import "phaser";

export default class Shot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, angle, isMyBullet = false, uuIdentity) {
    super(scene, x, y, "orb");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setAngle(angle);
    this.setScale(0.1);
    this.setTint(0x00fff0);
    this.setCollideWorldBounds(true);
    this.bullet_speed = 800;
    if (isMyBullet) {
      scene.myBullets.add(this);
    } else {
      scene.othersBullets.add(this);
    }
    this.uuIdentity = uuIdentity;

    scene.physics.add.collider(this, scene.otherPlayers, (bullet, players) => {
      bullet.destroy();
      console.log("Bullet destroyed");
    });

    // layer depth
    this.depth = 0;

    // this.vx = this.bullet_speed * Math.cos(angle + 1.5708);
    // this.vy = this.bullet_speed * Math.sin(angle + 1.5708);

    // DEG TO RAD
    // angle = angle * (Math.PI / 180);
    // console.log(angle);

    this.vx = this.bullet_speed * Math.cos(angle);
    this.vy = this.bullet_speed * Math.sin(angle);
    this.setVelocity(this.vx, this.vy);
  }
}
