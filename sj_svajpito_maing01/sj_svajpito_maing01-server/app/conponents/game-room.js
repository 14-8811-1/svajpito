const Player = require("./player");
const Star = require("./star");
const Bullet = require("./bullet");

class GameRoom {
  constructor(id) {
    this._id = id;
    this._players = [];
    this._start = new Star();
  }

  getId() {
    return this._id;
  }

  getStar() {
    return this._start;
  }

  addPlayer({ name, uuIdentity, client, position }) {
    let player;
    if (!this._players.find((p) => p.getUuIdentity() === uuIdentity)) {
      player = new Player({ name, uuIdentity, client, position });
      this._players.push(player);

      this.sendPlayerUpdate(player, this._id, "playerAdd");
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
    let starInfo = this._start.getStarInfo();
    this._informPlayers(starInfo, gameId || this._id, skipPlayer, identifier);
  }

  sendBulletUpdate(skipPlayer, gameId, identifier, bulletData) {
    let bullet = new Bullet(bulletData, skipPlayer.getUuIdentity());
    this._informPlayers(bullet.getBulletInfo(), gameId || this._id, skipPlayer, identifier);
  }

  sendPlayerDead(skipPlayer, gameId, identifier, data) {
    this._informPlayers({ ...skipPlayer.getPlayerInfo(), ...data }, gameId || this._id, skipPlayer, identifier);
  }

  sendPlayerHit(skipPlayer, gameId, identifier, data) {
    this._informPlayers({ ...skipPlayer.getPlayerInfo(), ...data }, gameId || this._id, skipPlayer, identifier);
  }

  sendPlayerActivation(skipPlayer, gameId, identifier, data) {
    this._informPlayers({ ...skipPlayer.getPlayerInfo(), ...data }, gameId || this._id, skipPlayer, identifier);
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
