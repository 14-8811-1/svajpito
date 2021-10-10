class GameStorage {
  constructor() {
    this.storage = {};
  }

  addGame({ awid, gameRoom }) {
    if (!this.storage[awid]) {
      this.storage[awid] = {};
    }

    if (!this.storage[awid][gameRoom.getId()]) {
      this.storage[awid][gameRoom.getId()] = gameRoom;
    }
  }

  getGame({ awid, gameId }) {
    let awidStorage = this.storage[awid];
    if (!awidStorage) {
      return null;
    }

    return awidStorage[gameId] || null;
  }

  removePlayer(awid, uuIdentity) {
    let awidStorage = this.storage[awid];
    if (!awidStorage) {
      return null;
    }

    Object.values(awidStorage).forEach((gameRoom) => {
      gameRoom.removePlayer(uuIdentity);
    });
  }
}

module.exports = new GameStorage();
