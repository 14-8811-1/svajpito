"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class RoomMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }

  async listByState(awid, state, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    return super.find({ awid, state }, pageInfo, sort);
  }

  async list(awid, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    return super.find({ awid }, pageInfo, sort);
  }

}

module.exports = RoomMongo;
