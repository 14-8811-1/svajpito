import "phaser";
import * as UU5 from "uu5g04";
import { onEvent, triggerEvent } from "../../common/communication-helper";

import Shot from "../entity/shot";
import Player from "../entity/player";
import Enemy from "../entity/enemy";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    //PRELOAD SPRITES
    this.load.image("ship", "assets/spaceShips_001.png");
    this.load.image("otherPlayer", "assets/enemyBlack5.png");
    this.load.image("star", "assets/star_gold.png");
  }

  //CREATE
  create() {
    let self = this;
    this.myBullets = this.physics.add.group();
    this.othersBullets = this.physics.add.group();
    this.otherPlayers = this.physics.add.group();

    // load current players for the new player when he joins the game
    onEvent("currentPlayers", (players) => {
      let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
      console.log(uuIdentity);
      players.forEach(function (player) {
        if (player.uuIdentity === uuIdentity) {
          self._addPlayer(self, player);
        } else {
          self._addOtherPlayers(self, player);
        }
      });
    });

    /**
     * another player join the game
     */
    onEvent("newPlayer", (playerInfo) => {
      self._addOtherPlayers(self, playerInfo);
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
     * player changed the position
     */
    onEvent("playerMoved", (playerInfo) => {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.uuIdentity === otherPlayer.uuIdentity) {
          otherPlayer.setRotation(playerInfo.rotation);
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    /**
     * Star location
     */
    onEvent("starLocation", (starLocation) => {
      console.log(`event called starLocation`, starLocation);
      if (self.star) self.star.destroy();
      self.star = self.physics.add.image(starLocation.x, starLocation.y, "star");
      self.physics.add.overlap(
        self.ship,
        self.star,
        function () {
          self.star.destroy();
          triggerEvent("starCollected");
          console.log(`event triggered starLocation`);
        },
        null,
        self
      );
    });

    /**
     * Shot on button press
     */
    this.input.keyboard.on("keydown-F", () => {
      let args = { x: this.ship.x, y: this.ship.y, angle: this.ship.rotation };

      new Shot(this, ...Object.values(args), true);
      triggerEvent("newBullet", args);
    });

    /**
     * Show bullet from someone else
     */
    onEvent("bulletData", (bulletData) => {
      new Shot(this, ...Object.values(bulletData));
    });
  }

  update() {
    //call player update
    if (this.ship) {
      let angle = 0.5 * Math.PI;
      let velocity = 1600;
      // vertical movement
      if (this.cursors.left.isDown) {
        this.ship.setRotation(angle);
        this.ship.setVelocity(-velocity, 0);
      } else if (this.cursors.right.isDown) {
        this.ship.setRotation(-angle);
        this.ship.setVelocity(velocity, 0);
      }
      // horizontal movement
      if (this.cursors.down.isDown) {
        this.ship.setRotation(0);
        this.ship.setVelocity(0, velocity);
      } else if (this.cursors.up.isDown) {
        this.ship.setRotation(-2 * angle);
        this.ship.setVelocity(0, -velocity);
      }

      this.physics.world.wrap(this.ship, 5);

      // emit player movement
      let x = this.ship.x;
      let y = this.ship.y;
      let r = this.ship.rotation;
      if (
        this.ship.oldPosition &&
        (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)
      ) {
        triggerEvent("playerMovement", {
          x: this.ship.x,
          y: this.ship.y,
          rotation: this.ship.rotation,
        });
      }
      // save old position data
      this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation,
      };
    }
  }

  /**
   * Add player Sprite to Scene
   * @param self
   * @param playerInfo
   * @private
   */
  _addPlayer(self, playerInfo) {
    self.ship = new Player(this, playerInfo.x, playerInfo.y, "ship", playerInfo);
  }

  /**
   * Add other player Sprite to Scene
   * @param self
   * @param playerInfo
   * @private
   */
  _addOtherPlayers(self, playerInfo) {
    let otherPlayer = new Enemy(this, playerInfo.x, playerInfo.y, "otherPlayer", playerInfo);
    self.otherPlayers.add(otherPlayer);
  }
}
