const Player = require("./player");
const Star = require("./star");
const Bullet = require("./bullet");
const pickSpawnPoint = require("../helpers/spawner");
const Elo = require("../abl/elo");

const TIME_LIMIT = 5 * 60;

class GameRoom {
  constructor(id) {
    this._id = id;
    this._players = [];
    this._star = new Star();
    this._state = "waiting";
    this._time = -20;
    console.log("GameRoom created");
  }

  getId() {
    return this._id;
  }

  getStar() {
    return this._star;
  }

  addPlayer({ name, uuIdentity, client, position }) {
    let player;
    if (!this._players.find((p) => p.getUuIdentity() === uuIdentity)) {
      player = new Player({ name, uuIdentity, client, position });
      this._players.push(player);

      this.sendPlayerUpdate(player, this._id, "playerAdd");

      if (this._state === "waiting" && this._players.length >= 2) {
        this.start(player);
      } else if (this._state === "waiting") {
        console.log("GameRoom: waiting for more players");
      }
    }

    return player;
  }

  getPlayer(uuIdentity) {
    return this._players.find((p) => p.getUuIdentity() === uuIdentity);
  }

  getPlayers() {
    return this._players;
  }

  removePlayer(uuIdentity) {
    let player = this.getPlayer(uuIdentity);
    this._players = this._players.filter((p) => uuIdentity !== p.getUuIdentity());

    return player;
  }

  getPlayerInfoList() {
    return this._players.map((p) => p.getPlayerInfo());
  }

  updatePlayerListScore(playerData, uuIdentity) {
    let player = this._players.find((p) => p.getUuIdentity() === playerData.uuIdentity);
    if (player) {
      player.setScore(playerData.score);
    }

    this.sendPlayerUpdate(player, this._id, "playerUpdate");
  }

  sendPlayerUpdate(skipPlayer, gameId, identifier) {
    let playerInfo = skipPlayer && skipPlayer.getPlayerInfo();
    if (playerInfo) {
      this._informPlayers(playerInfo, gameId || this._id, skipPlayer, identifier);
    }
  }

  sendStarUpdate(skipPlayer, gameId, identifier) {
    let starInfo = this._star.getStarInfo();
    this._informPlayers(starInfo, gameId || this._id, skipPlayer, identifier);
  }

  sendBulletUpdate(skipPlayer, gameId, identifier, bulletData) {
    let bullet = new Bullet(bulletData, skipPlayer.getUuIdentity());
    this._informPlayers(bullet.getBulletInfo(), gameId || this._id, skipPlayer, identifier);
  }

  sendPlayerDead(skipPlayer, gameId, identifier, data) {
    setTimeout(() => this.respawnPlayer(skipPlayer, gameId), 3000);
    this._informPlayers({ ...skipPlayer.getPlayerInfo(), ...data }, gameId || this._id, skipPlayer, identifier);
  }

  respawnPlayer(player, gameId) {
    player.reset({ position: pickSpawnPoint() });
    this._informPlayers(player.getPlayerInfo(), gameId || this._id, { uuIdentity: "" }, "respawn");
  }

  sendPlayerHit(skipPlayer, gameId, identifier, data) {
    this._informPlayers({ ...skipPlayer.getPlayerInfo(), ...data }, gameId || this._id, skipPlayer, identifier);
  }

  getGameRoomInfo() {
    return {
      id: this._id,
      players: this._players.map((p) => p.getPlayerInfo()),
      state: this._state,
      time: this._time,
      limit: TIME_LIMIT,
    }
  }

  getGameRoomShortInfo() {
    return {
      id: this._id,
      state: this._state,
      time: this._time,
      limit: TIME_LIMIT,
    } 
  }

  start(skipPlayer) {
    this._state = "starting";
    console.log("GameRoom: starting");
    this._informPlayers(this.getGameRoomInfo(), this._id, skipPlayer, "gameTick");
    this._gameTicker = setInterval(() => this._tick(), 1000);
  }

  _tick() {
    this._time++;

    if (this._time === 0) {
      this._state = "running";
    }

    this._informPlayers(this.getGameRoomShortInfo(), this._id, null, "gameTick");

    if (this._time >= TIME_LIMIT) {
      this._stop();
    }
  }

  stop() {
    this._state = "ended";
    clearInterval(this._gameTicker);
    this._informPlayers(this.getGameRoomInfo(), this._id, null, "gameTick");
    Elo.UpdateAbl.update(this._players.map((p) => p.getPlayerInfo())).then((_result) => {
      this._state = "counted";
      this._informPlayers(this.getGameRoomInfo(), this._id, null, "gameResult");
    });
  }

  _sendPlayerList(skipPlayer, gameId) {
    this._informPlayers(
      this._players.map((p) => p.getPlayerInfo()),
      gameId,
      skipPlayer
    );
  }

  _informPlayers(data, gameId, skipPlayer, identifier) {
    let players = this._players;

    players.forEach((player) => {
      if (skipPlayer instanceof Player && player.getUuIdentity() === skipPlayer.getUuIdentity()) return;
      player.inform(identifier, gameId, data);
    });
  }
}

module.exports = GameRoom;
