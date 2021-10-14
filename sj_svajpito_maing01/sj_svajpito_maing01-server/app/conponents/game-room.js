const Player = require("./player");

class GameRoom {
  constructor(id) {
    this._id = id;
    this._players = [];
  }

  getId() {
    return this._id;
  }

  addPlayer({ name, uuIdentity, client, position }) {
    let player;
    if (!this._players.find((p) => p.getUuIdentity() === uuIdentity)) {
      player = new Player({ name, uuIdentity, client, position });
      this._players.push(player);

      // this._sendPlayerList(player);
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
    // console.log("remove", uuIdentity, this._id);
    let player = this.getPlayer(uuIdentity);
    this._players = this._players.filter((p) => uuIdentity !== p.getUuIdentity());

    //this._sendPlayerList(player, this._id);
    // this.sendPlayerUpdate(player, this._id, "playerDelete");
    return player;
  }

  getPlayerInfoList() {
    return this._players.map((p) => p.getPlayerInfo());
  }

  updatePlayerListScore(playerData, uuIdentity) {
    // console.log(playerList);
    // this._players.forEach((player) => {
    let player = this._players.find((p) => p.getUuIdentity() === playerData.uuIdentity);
    if (player) {
      player.setScore(playerData.score);
    }
    // });

    // let skipPlayer = player // this.getPlayer(uuIdentity);
    // this._sendPlayerList(skipPlayer, this._id);
    this.sendPlayerUpdate(player, this._id, "playerUpdate");
  }

  sendPlayerUpdate(skipPlayer, gameId, identifier) {
    let playerInfo = skipPlayer && skipPlayer.getPlayerInfo();
    if (playerInfo) {
      this._informPlayers(
        playerInfo,
        // this._players.map((p) => p.getPlayerInfo()),
        gameId || this._id,
        skipPlayer,
        identifier
      );
    }
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
    if (skipPlayer instanceof Player) {
      players = this._players.filter((p) => p.getUuIdentity() !== skipPlayer.getUuIdentity());
    }
    players.forEach((player) => {
      player.inform(identifier, gameId, data);
    });
  }
}

module.exports = GameRoom;
