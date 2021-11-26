"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/elo-error.js").Update;

const EloRank = require("elo-rank");

const WARNINGS = {
  updateUnsupportedKeys: {
    code: `${Errors.UC_CODE}unsupportedKeys`,
  },
};

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("elo");
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("eloUpdateDtoInType", dtoIn);
    //A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let players = dtoIn.players;
    let exitingPlayers = await this.dao.list(awid);

    let elo = new EloRank(32);
    // let elo = new EloRank(32 / (players.length - 1));

    players.forEach((p) => {
      let existingSore = this.getPlayer(exitingPlayers.itemList, p.uuIdentity)?.score;
      p.totalScore = existingSore || 1000;
      if (existingSore !== undefined) {
        p.exists = true;
      } else {
        p.exists = false;
      }
    });

    let combinations = players.flatMap((v, i) => players.slice(i + 1).map((w) => [v, w]));

    combinations.forEach(([p1, p2]) => {
      let p1Score = players.find((p) => p.uuIdentity === p1.uuIdentity).totalScore;
      let p2Score = players.find((p) => p.uuIdentity === p2.uuIdentity).totalScore;

      let expectedScoreA = elo.getExpected(p1Score, p2Score);
      let expectedScoreB = elo.getExpected(p2Score, p1Score);

      if (p1.score > p2.score) {
        p1.totalScore = elo.updateRating(expectedScoreA, 1, p1Score);
        p2.totalScore = elo.updateRating(expectedScoreB, 0, p2Score);
      } else {
        p1.totalScore = elo.updateRating(expectedScoreA, 0, p1Score);
        p2.totalScore = elo.updateRating(expectedScoreB, 1, p2Score);
      }

      players.find((p) => p.uuIdentity === p1.uuIdentity).totalScore = p1.totalScore;
      players.find((p) => p.uuIdentity === p2.uuIdentity).totalScore = p2.totalScore;
    });

    for (let i = 0; i < players.length; i += 1) {
      let p = players[i];
      if (p.exists) {
        await this.dao.update(awid, p.uuIdentity, p.totalScore);
      } else {
        await this.dao.create(awid, { uuIdentity: p.uuIdentity, score: p.totalScore });
      }
    }

    return { uuAppErrorMap };
  }

  getPlayer(players, uuIdentity) {
    return players.find((p) => p.uuIdentity === uuIdentity);
  }
}

module.exports = new UpdateAbl();
