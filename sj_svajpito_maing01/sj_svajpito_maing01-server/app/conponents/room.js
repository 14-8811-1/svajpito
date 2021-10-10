const UuObject = require("./uu-object");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const PageInfoHelper = require("../helpers/page-info-helper");

const DEFAULTS = {
  sortBy: "sys.cts",
  order: "asc",
};

const STATES = {
  CREATED: "created",
  ACTIVE: "active",
  CLOSED: "closed",
};

const SCHEMA = "room";
/**
 * Class representing Room uuObject
 */
class Room extends UuObject {
  /**
   * Constructor
   * @param Errors
   * @param uri
   */
  constructor({ Errors, uri }) {
    super({ Errors, uri });
    /** @type {RoomMongo} */
    this.dao = DaoFactory.getDao(SCHEMA);
  }

  /**
   * Create Room
   * @param roomData
   * @param uuAppErrorMap
   * @returns {Promise<*>}
   */
  async create(roomData, uuAppErrorMap = {}) {
    let roomProduct;

    roomData.state = STATES.CREATED;

    try {
      roomProduct = await this.dao.create(roomData);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new this.errors.CreateRoomFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    this.data = roomProduct;

    return roomProduct;
  }

  /**
   * Get Room uuObject
   * @param id
   * @param uuAppErrorMap
   * @returns {Promise<void>}
   */
  async get({ id }, uuAppErrorMap = {}) {
    let awid = this.uri.getAwid();
    let roomData = await this.dao.get(awid, id);

    if (!roomData) {
      throw new this.errors.RoomDoesNotExist({ uuAppErrorMap }, { id });
    }

    this.data = roomData;

    return roomData;
  }

  /**
   * List Rooms
   * @param state
   * @param sortBy
   * @param order
   * @param pageInfo
   * @returns {Promise<void>}
   */
  async list({ state }, sortBy, order, pageInfo) {
    let roomDataList;
    pageInfo = PageInfoHelper.getDefaultPageInfo(pageInfo);
    if (!sortBy) sortBy = DEFAULTS.sortBy;
    if (!order) order = DEFAULTS.order;

    if (state) {
      roomDataList = await this.dao.listByState(this.uri.getAwid(), state, sortBy, order, pageInfo);
    } else {
      roomDataList = await this.dao.list(this.uri.getAwid(), sortBy, order, pageInfo);
    }

    return roomDataList;
  }

  async start() {}

  async join() {}
}

module.exports = Room;
