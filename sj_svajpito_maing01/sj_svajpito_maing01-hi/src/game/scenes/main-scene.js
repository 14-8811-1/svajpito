import "phaser";
import * as UU5 from "uu5g04";
import Player from "../entity/player";
import Ground from "../entity/ground";
import Enemy from "../entity/enemy";
import store, { UPDATE_SCORE } from "../store";
// import Firefly from "../entity/firefly";
import { onEvent, triggerEvent } from "../../common/communication-helper";
import Shot from "../../game/entity/shot";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.score = 0;

    // this.otherPlayers = this.physics.add.group();
    // this.collectFirefly = this.collectFirefly.bind(this);
  }
  preload() {
    //PRELOAD SPRITES
    this.load.image("woods", "./assets/backgrounds/woods.png");
    this.load.spritesheet("newt", "assets/spriteSheets/newt.png", {
      frameWidth: 118.1,
      frameHeight: 131,
    });
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("mainGround", "assets/sprites/mainGround.png");
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("twinkle", "assets/audio/twinkle.wav");
    // this.load.image("firefly", "assets/sprites/firefly.png");
  }

  //ANIMATIONS HELPER FUNC
  createAnimations() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("newt", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "leftJump",
      frames: [{ key: "newt", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "newt", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "rightJump",
      frames: [{ key: "newt", frame: 6 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("newt", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "wearingHat",
      frames: [{ key: "newt", frame: 10 }],
      frameRate: 20,
    });
  }

  //CREATE
  create() {
    let self = this;
    this.otherPlayers = this.physics.add.group();
    this.myBullets = this.physics.add.group();
    this.othersBullets = this.physics.add.group();

    /**
     * load current players for the new player when he joins the game
     */
    onEvent("currentPlayers", (players) => {
      let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
      console.log(uuIdentity);
      players.forEach(function (player) {
        if (player.uuIdentity === uuIdentity) {
          self.addPlayer(player);
        } else {
          self.addOtherPlayers(player);
        }
      });
    });

    /**
     * another player join the game
     */
    onEvent("newPlayer", (playerInfo) => {
      console.log("new player");
      self.addOtherPlayers(playerInfo);
    });

    /**
     * some player left the game
     */
    onEvent("disconnect", (playerInfo) => {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          otherPlayer.destroy();
        }
      });
    });

    /**
     * player changed the position
     */
    onEvent("playerMoved", (playerInfo) => {
      // console.log("update1", playerInfo, self.otherPlayers.getChildren());
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          // otherPlayer.setRotation(playerInfo.rotation);
          console.log("update2", playerInfo);
          // playerInfo.velocityX !== undefined && otherPlayer.setVelocityX(playerInfo.velocityX);
          // playerInfo.velocityY !== undefined && otherPlayer.setVelocityY(playerInfo.velocityY);
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    /**
     * some player has died
     */
    onEvent("playerDied", (playerInfo) => {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          console.log("destroy", "");
          otherPlayer.destroy();
        }
      });
    });

    /**
     * Shot on button press
     */
    this.input.keyboard.on("keydown-F", () => {
      let args = { x: this.player.x, y: this.player.y, angle: this.player.rotation };

      new Shot(this, ...Object.values(args), true);
      triggerEvent("newBullet", args);
    });

    this.input.on(
      "pointerdown",
      function (pointer) {
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(
          this.player.x,
          this.player.y,
          cursor.x + this.cameras.main.scrollX,
          cursor.y + this.cameras.main.scrollY
        );

        let args = { x: this.player.x, y: this.player.y, angle };

        new Shot(this, ...Object.values(args), true);
        triggerEvent("newBullet", args);
      },
      this
    );

    /**
     * Show bullet from someone else
     */
    onEvent("bulletData", (bulletData) => {
      new Shot(this, ...Object.values(bulletData));
    });

    //set up world bounds
    this.physics.world.setBounds(0, 0, 800, 600);

    //background
    this.add.image(-160, 0, "woods").setOrigin(0).setScale(0.5);

    this.createAnimations();

    //cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //platforms
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });

    this.groundGroup.create(160, 100, "ground");
    this.groundGroup.create(250, 350, "ground");
    this.groundGroup.create(530, 200, "ground");
    this.groundGroup.create(600, 510, "ground");

    //floor
    this.groundGroup.create(160, 620, "mainGround");

    //fireflies
    // this.fireflies = this.physics.add.group({ classType: Firefly });
    //
    // for (var i = 0; i < 30; i++) {
    //   let x = Phaser.Math.RND.between(0, 800);
    //   let y = Phaser.Math.RND.between(0, 600);
    //
    //   this.fireflies.create(x, y, "firefly");
    // }

    // this.fireflies.children.iterate((child) => {
    //   child.body.setAllowGravity(false);
    //   child.setScale(0.1, 0.1);
    // });

    //sounds
    this.jumpSound = this.sound.add("jump");
    this.jumpSound.volume = 0.5;
    this.twinkle = this.sound.add("twinkle");

    //colliders
    // this.physics.add.collider(this.fireflies, this.groundGroup);

    // this.physics.add.overlap(this.player, this.fireflies, this.collectFirefly, null, this);
    //launch OpeningScene
    // this.scene.launch("OpeningScene");
    this.scene.launch("MainScene");
  }

  addPlayer(playerInfo) {
    this.player = new Player(this, 20, 400, "newt", playerInfo).setScale(0.5);

    // this.player.setBounce(0.2);
    this.player.body.setGravityY(350);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.groundGroup);
  }

  addOtherPlayers(playerInfo) {
    console.log("hereee", playerInfo);
    let otherPlayer = new Enemy(this, playerInfo.x, playerInfo.y, "newt", playerInfo).setScale(0.5);
    this.physics.add.collider(otherPlayer, this.groundGroup);
    // otherPlayer.setBounce(0.2);
    // otherPlayer.body.setGravityY(350);
    otherPlayer.setCollideWorldBounds(true);
    // otherPlayer.moveto
    this.otherPlayers.add(otherPlayer);
  }

  // //COLLECT FIREFLY HELPER FUNC
  // collectFirefly(player, firefly) {
  //   firefly.disableBody(true, true);
  //   this.score += 10;
  //   store.dispatch({ type: UPDATE_SCORE, score: this.score });
  //   firefly.update(this.twinkle);
  // }

  update() {
    //call player update
    if (this.player) {
      this.player.update(this.cursors, this.jumpSound);
    }
  }
}
