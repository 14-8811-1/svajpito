const Player = require("./player");

class GameRoom {
  constructor(id) {
    this._id = id;
    this._players = [];
  }

  getId() {
    return this._id;
  }

  addPlayer({ name, uuIdentity, client }) {
    if (!this._players.find((p) => p.getUuIdentity() === uuIdentity)) {
      let player = new Player({ name, uuIdentity, client });
      this._players.push(player);

      this._sendPlayerList(player);
    }
  }

  getPlayer(uuIdentity) {
    return this._players.find((p) => p.getUuIdentity() === uuIdentity);
  }

  removePlayer(uuIdentity) {
    console.log("remove", uuIdentity, this._id);
    let player = this.getPlayer(uuIdentity);
    this._players = this._players.filter((p) => uuIdentity !== p.getUuIdentity());
    this._sendPlayerList(player, this._id);
  }

  getPlayerInfoList() {
    return this._players.map((p) => p.getPlayerInfo());
  }

  _sendPlayerList(skipPlayer, gameId) {
    this._informPlayers(
      this._players.map((p) => p.getPlayerInfo()),
      gameId,
      skipPlayer
    );
  }

  _informPlayers(data, gameId, skipPlayer) {
    let players = this._players;
    if (skipPlayer instanceof Player) {
      players = this._players.filter((p) => p.getUuIdentity() !== skipPlayer.getUuIdentity());
    }
    players.forEach((player) => {
      player.inform("playerList", gameId, data);
    });
  }
}

module.exports = GameRoom;
