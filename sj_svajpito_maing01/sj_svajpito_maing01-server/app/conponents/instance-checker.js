"use strict";

const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const ACTIVE_STATE = "active";

class InstanceChecker {
  constructor() {
    this.dao = DaoFactory.getDao("svajpitoMain");
  }

  /**
   * Loads App instance, check its existence and verifies proper state.
   * @param awid
   * @param errors
   * @param uuAppErrorMap
   * @returns {Promise<*>}
   */
  async ensureInstanceAndState(awid, errors, uuAppErrorMap = {}) {
    let appInstance = await this.ensureInstance(awid, errors.CertificationDoesNotExist, uuAppErrorMap);
    if (ACTIVE_STATE !== appInstance.state) {
      throw new errors.CertificationIsNotInCorrectState(
        { uuAppErrorMap },
        {
          awid,
          state: appInstance.state,
          expectedState: ACTIVE_STATE,
        }
      );
    }

    return appInstance;
  }

  /**
   * Loads App instance and check its existence
   * @param awid
   * @param error
   * @param uuAppErrorMap
   * @returns {Promise<void>}
   */
  async ensureInstance(awid, error, uuAppErrorMap = {}) {
    let certification = await this.dao.getByAwid(awid);

    if (!certification) {
      throw new error({ uuAppErrorMap }, { awid });
    }

    return certification;
  }
}

module.exports = new InstanceChecker();
