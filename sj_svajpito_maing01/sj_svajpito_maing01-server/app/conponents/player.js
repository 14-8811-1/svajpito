class Player {
  constructor({ name, uuIdentity, client }) {
    this._name = name;
    this._uuIdentity = uuIdentity;
    this._client = client;
  }

  getPlayerInfo() {
    return {
      name: this._name,
      uuIdentity: this._uuIdentity,
    };
  }

  getUuIdentity() {
    return this._uuIdentity;
  }

  getClient() {
    return this._client;
  }

  inform(identifier, data) {
    let dtoIn = {
      identifier,
      data,
    };
    this._client.unwrap().write(`data: ${JSON.stringify(dtoIn)}\n\n`);
  }
}

module.exports = Player;
