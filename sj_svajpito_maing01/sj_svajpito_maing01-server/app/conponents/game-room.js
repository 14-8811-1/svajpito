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

  removePlayer(uuIdentity) {
    this._players.filter((p) => uuIdentity !== p.getUuIdentity());
  }

  getPlayerInfoList() {
    return this._players.map((p) => p.getPlayerInfo());
  }

  _sendPlayerList(player) {
    this._informPlayers(
      this._players.map((p) => p.getPlayerInfo()),
      player
    );
  }

  _informPlayers(data, player) {
    let players = this._players;
    if (player) {
      players = this._players.filter((p) => p.getUuIdentity() !== player.getUuIdentity());
    }
    console.log(players);
    players.forEach((player) => {
      player.inform("playerList", data);
    });
  }
}

module.exports = GameRoom;
