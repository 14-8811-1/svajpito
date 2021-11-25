import "phaser";
import * as UU5 from "uu5g04";
import Player from "../entity/player";
import Ground from "../entity/ground";
import Enemy from "../entity/enemy";
import store, { UPDATE_SCORE } from "../store";
// import Firefly from "../entity/firefly";
import { onEvent, triggerEvent } from "../../common/communication-helper";
import Shot from "../../game/entity/shot";
import Score from "../overlay/score";
import AlertText from "../overlay/alert";

const AUDIO_FILES = {
  death: ["assets/audio/death/death1.wav", "assets/audio/death/death2.wav"],
  jump: [
    "assets/audio/jump/jump1.wav",
    "assets/audio/jump/jump2.mp3",
    "assets/audio/jump/jump3.mp3",
    "assets/audio/jump/jump4.wav",
  ],
  woohoo: [
    "assets/audio/woohoo/woohoo1.wav",
    "assets/audio/woohoo/woohoo2.wav",
    "assets/audio/woohoo/woohoo3.wav",
    "assets/audio/woohoo/woohoo4.wav",
    "assets/audio/woohoo/woohoo5.wav",
  ],
};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");

    // this.otherPlayers = this.physics.add.group();
    // this.collectFirefly = this.collectFirefly.bind(this);
  }
  preload() {
    //PRELOAD SPRITES
    this.load.image("woods", "./assets/backgrounds/woods.png");
    this.load.image("star", "assets/star_gold.png");
    this.load.spritesheet("newt", "assets/spriteSheets/newt.png", {
      frameWidth: 118.1,
      frameHeight: 131,
    });
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("mainGround", "assets/sprites/mainGround.png");
    this.load.audio("twinkle", "assets/audio/twinkle.wav");

    this.load.audio("death.0", "assets/audio/death/death1.wav");

    const loadMultipleAudioFiles = (identifier, paths) =>
      paths.forEach((path, idx) => {
        this.load.audio(`${identifier}_${idx}`, path);
        console.log(`${identifier}_${idx}`, path);
      });
    Object.entries(AUDIO_FILES).forEach(([key, paths]) => loadMultipleAudioFiles(key, paths));

    this.load.audio("countdown", "assets/audio/countdown.mp3");
    this.load.audio("music", "assets/audio/music.mp3");
    // this.load.image("firefly", "assets/sprites/firefly.png");
  }

  playRandom(identifier) {}

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

    this.sounds = {};
    const prepareSound = (identifier, paths) => {
      paths.forEach((path, idx) => {
        const snd = this.sound.add(`${identifier}_${idx}`);
        snd.volume = 0.5;
        this.sounds[`${identifier}_${idx}`] = snd;
      });
      this.sounds[identifier] = {
        play: () => this.sounds[`${identifier}_${Math.floor(Math.random() * (paths.length - 1))}`].play(...arguments),
        pick: () => this.sounds[`${identifier}_${Math.floor(Math.random() * (paths.length - 1))}`],
      };
    };
    Object.entries(AUDIO_FILES).forEach(([key, paths]) => prepareSound(key, paths));

    this.sounds.twinkle = this.sound.add("twinkle");
    this.sounds.countdown = this.sound.add("countdown");
    this.sounds.countdown.volume = 0.5;

    this.sounds.music = this.sound.add("music", { loop: true });
    this.sounds.music.volume = 0.2;

    /**
     * load current players for the new player when he joins the game
     */
    onEvent("currentPlayers", (players) => {
      console.log({ players });
      let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
      //console.log(uuIdentity);
      players.forEach(function (player) {
        if (player.uuIdentity === uuIdentity) {
          self.addPlayer(player);
        } else {
          self.addOtherPlayers(player);
        }
      });
    });

    /**
     *  new player location when he respawns
     */
    onEvent("respawn", (player) => {
      let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
      //console.log(uuIdentity);
      console.log({ player });
      if (player.uuIdentity === uuIdentity) {
        self.addPlayer(player);
      } else {
        self.addOtherPlayers(player);
      }
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
          //console.log("update2", {x: playerInfo.x, y: playerInfo.y, vX: playerInfo.velocityX, vY: playerInfo.velocityY,});
          otherPlayer.updatePlayerInfo(playerInfo);
        }
      });
    });

    /**
     * some player has died
     */
    onEvent("playerDied", (playerInfo) => {
      self.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          console.log("destroy", otherPlayer.uuIdentity);
          otherPlayer.destroy();
          console.log({
            dead: otherPlayer.uuIdentity,
            killer: playerInfo.killerUuIdentity,
            me: this.player.uuIdentity,
          });
          if (playerInfo.killerUuIdentity === this.player.uuIdentity) {
            this.score.increment();
          }
        }
      });
    });

    onEvent("playerHit", (playerInfo) => {
      console.log("playerHit", playerInfo);
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          otherPlayer.setHealth(playerInfo.health);
        }
      });
    });

    /**
     * Star location
     */
    onEvent("starLocation", (starLocation) => {
      console.log(`event called starLocation`, starLocation);
      if (self.star) self.star.destroy();
      self.star = self.physics.add.image(starLocation.x, starLocation.y, "star").setImmovable(true);
      self.star.body.setAllowGravity(false);
      self.physics.add.overlap(
        self.player,
        self.star,
        function (player, star) {
          let random = Math.floor(Math.random() * 4);
          switch (random) {
            case 0:
              player.setImmortal();
              break;
            case 1:
              player.setSpeedBoost();
              break;
            case 2:
              triggerEvent("superPower", { power: "cantShoot" });
              break;
            case 3:
              triggerEvent("superPower", { power: "cantMove" });
          }
          self.star.destroy();
          triggerEvent("starCollected");
          console.log(`event triggered starLocation`);
        },
        null,
        self
      );
    });

    onEvent("superPowerActivated", (activation) => {
      console.log("superPowerActivated", activation.power);
      if (activation.power === "cantShoot") {
        this.player.cantShot();
        this.alertText.update("you cant shoot");
      } else if (activation.power === "cantMove") {
        this.player.cantMove();
      this.alertText.update("you cant move");

      }
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
      (pointer) => {
        if (!this.player.isAlive) return;
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(
          this.player.x,
          this.player.y,
          cursor.x + this.cameras.main.scrollX,
          cursor.y + this.cameras.main.scrollY
        );

        let args = { x: this.player.x, y: this.player.y, angle };

        if (this.player.canShot) {
          new Shot(this, ...Object.values(args), true);
          triggerEvent("newBullet", args);
        }
      },
      this
    );

    /**
     * Show bullet from someone else
     */
    onEvent("bulletData", (bulletData) => {
      console.log("bulletData", bulletData);
      new Shot(this, bulletData.x, bulletData.y, bulletData.angle, false, bulletData.uuIdentity);
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

    //colliders
    // this.physics.add.collider(this.fireflies, this.groundGroup);

    // this.physics.add.overlap(this.player, this.fireflies, this.collectFirefly, null, this);
    //launch OpeningScene
    // this.scene.launch("OpeningScene");
    this.scene.launch("MainScene");
    // this.sounds.music.play();

    this.score = new Score(this, 0);
    this.alertText = new AlertText(this, "");
  }

  addPlayer(playerInfo) {
    this.player = new Player(this, 20, 400, "newt", playerInfo, this.sounds).setScale(0.5);

    // this.player.setBounce(0.2);
    this.player.body.setGravityY(350);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.groundGroup);

    // set score from playerInfo
    this.score.update(playerInfo.score);
  }

  addOtherPlayers(playerInfo) {
    let otherPlayer = new Enemy(this, playerInfo.x, playerInfo.y, "newt", playerInfo).setScale(0.5);
    this.physics.add.collider(otherPlayer, this.groundGroup);
    // otherPlayer.setBounce(0.2);
    // otherPlayer.body.setGravityY(350);
    otherPlayer.setCollideWorldBounds(true);
    // otherPlayer.moveto
    this.otherPlayers.add(otherPlayer);
  }

  // COLLECT FIREFLY HELPER FUNC
  // collectFirefly(player, firefly) {
  //   firefly.disableBody(true, true);
  //   this.score += 10;
  //   store.dispatch({ type: UPDATE_SCORE, score: this.score });
  //   firefly.update(this.twinkle);
  // }

  update(time, delta) {
    //call player update
    if (this.player) {
      this.player.update(this.cursors, this.sounds.jump);
    }
    this.otherPlayers.getChildren().forEach((otherPlayer) => otherPlayer.update());
  }

  gameOver() {}
}
