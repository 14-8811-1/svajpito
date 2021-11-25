"use strict";

const gameStorage = require("../../conponents/game-storage");
const Errors = require("../../api/errors/game-error").Update;
const SCORE_LIMIT = 10;

class UpdateAbl {
  async update(uri, dtoIn, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    // ValidationHelper.processValidation({
    //   dtoIn,
    //   validationSchema: "roomGetDtoInType",
    //   Errors,
    //   uuAppErrorMap,
    // });
    if (typeof dtoIn.message === "string") {
      dtoIn = JSON.parse(dtoIn.message);
    }
    console.log(dtoIn.identifier, dtoIn.data);

    let uuIdentity = session.getIdentity().getUuIdentity();
    let gameRoom = gameStorage.getGame({ awid, gameId: dtoIn.data.gameId });

    let response = {};
    let player = gameRoom.getPlayer(uuIdentity);
    if (player && player.IsAlive()) {
      if (dtoIn.identifier === "playerMovement") this.processPlayerMovement(player, gameRoom, dtoIn.data, uuIdentity);
      if (dtoIn.identifier === "starCollected") response = this.processStarCollected(player, gameRoom, uuIdentity);
      if (dtoIn.identifier === "newBullet") this.processNewBullet(player, gameRoom, dtoIn.data, uuIdentity);
      if (dtoIn.identifier === "playerDead") this.processPlayerDead(player, gameRoom, dtoIn.data, uuIdentity);
      if (dtoIn.identifier === "playerShot") this.processPlayerShot(player, gameRoom, dtoIn.data, uuIdentity);
      if (dtoIn.identifier === "superPower") this.processSuperPower(player, gameRoom, dtoIn.data, uuIdentity);
    }

    return { ...response, uuAppErrorMap };
  }

  /**
   * Process player movement
   * @param player
   * @param gameRoom
   * @param data
   * @param uuIdentity
   */
  processPlayerMovement(player, gameRoom, data, uuIdentity) {
    player.setPosition(data.x, data.y);
    player.setVelocity(data.velocityX, data.velocityY);
    player.setRotation(data.rotation);

    gameRoom.sendPlayerUpdate(player, gameRoom.getId(), "playerMoved");
  }

  /**
   * Process player dead
   * @param player
   * @param gameRoom
   * @param data
   * @param uuIdentity
   */
  processPlayerDead(player, gameRoom, data, _uuIdentity) {
    player.setAlive(false);
    const killer = gameRoom.getPlayer(data.killerUuIdentity);
    killer.increaseScore(1);
    gameRoom.sendPlayerDead(player, gameRoom.getId(), "playerDied", data);
    if (killer.getScore() >= SCORE_LIMIT) {
      gameRoom.stop();
    }
  }

  /**
   *
   * @param player
   * @param gameRoom
   * @param data
   */
  processPlayerShot(player, gameRoom, data, _uuIdentity) {
    player.setHealth(player.getHealth() - data.damage);
    gameRoom.sendPlayerHit(player, gameRoom.getId(), "playerHit", data);
  }

  /**
   *
   * @param player
   * @param gameRoom
   * @param data
   */
  processSuperPower(player, gameRoom, data, _uuIdentity) {
    player.setHealth(player.getHealth() - data.damage);
    gameRoom.sendPlayerHit(player, gameRoom.getId(), "superPowerActivated", data);
  }

  /**
   * Process new bullet
   * @param player
   * @param gameRoom
   * @param data
   * @param uuIdentity
   */
  processNewBullet(player, gameRoom, data, uuIdentity) {
    gameRoom.sendBulletUpdate(player, gameRoom.getId(), "bulletData", data);
  }

  /**
   * Process Star collected
   * @param player
   * @param gameRoom
   * @param uuIdentity
   * @returns {{identifier: string, data: {x: *, y: *}}}
   */
  processStarCollected(player, gameRoom, uuIdentity) {
    player.increaseScore(10);

    let star = gameRoom.getStar();
    let x = Math.floor(Math.random() * 700) + 50;
    let y = Math.floor(Math.random() * 500) + 50;
    star.setPosition(x, y);

    gameRoom.sendStarUpdate(player, gameRoom.getId(), "starLocation");

    return {
      identifier: "starLocation",
      data: gameRoom.getStar().getStarInfo(),
    };
  }
}

module.exports = new UpdateAbl();
