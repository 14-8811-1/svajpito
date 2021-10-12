"use strict";
const SvajpitoMainUseCaseError = require("./svajpito-main-use-case-error.js");

const Update = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  Update,
};
