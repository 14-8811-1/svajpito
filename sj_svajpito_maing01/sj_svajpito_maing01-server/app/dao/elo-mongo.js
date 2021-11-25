"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class EloMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, uuIdentity: 1 }, { unique: true });
  }

  async get(awid, uuIdentity) {
    return super.findOne({ awid, uuIdentity });
  }

  async create(awid, uuObject) {
    return super.insertOne({ ...uuObject, awid });
  }

  async update(awid, uuIdentity, score) {
    return super.findOneAndUpdate({ awid, uuIdentity }, { score }, "NONE");
  }

  async list(awid, pageInfo) {
    return super.find({ awid }, pageInfo, { score: -1 });
  }
}

module.exports = EloMongo;
