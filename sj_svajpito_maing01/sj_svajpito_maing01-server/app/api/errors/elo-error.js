"use strict";

const SvajpitoMainUseCaseError = require("./svajpito-main-use-case-error.js");
const ELO_ERROR_PREFIX = `${SvajpitoMainUseCaseError.ERROR_PREFIX}elo/`;

const Update = {
  UC_CODE: `${ELO_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const List = {
  UC_CODE: `${ELO_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Update,
};
