"use strict";
const SvajpitoMainUseCaseError = require("./svajpito-main-use-case-error.js");

const Create = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InstanceDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}InstanceDoesNotExist`;
      this.message = "Instance does not exist.";
    }
  },
  InstanceIsNotInCorrectState: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}instanceIsNotInCorrectState`;
      this.message = "Instance is not a valid state.";
    }
  },
  CreateRoomFailed: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}createRoomFailed`;
      this.message = "Create room failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InstanceDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}InstanceDoesNotExist`;
      this.message = "Instance does not exist.";
    }
  },
  InstanceIsNotInCorrectState: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}instanceIsNotInCorrectState`;
      this.message = "Instance is not a valid state.";
    }
  },
  RoomDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}roomDoesNotExist`;
      this.message = "Room does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InstanceDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}InstanceDoesNotExist`;
      this.message = "Instance does not exist.";
    }
  },
  InstanceIsNotInCorrectState: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}instanceIsNotInCorrectState`;
      this.message = "Instance is not a valid state.";
    }
  },
};

const Join = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}join/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Join.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InstanceDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Join.UC_CODE}InstanceDoesNotExist`;
      this.message = "Instance does not exist.";
    }
  },
  InstanceIsNotInCorrectState: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Join.UC_CODE}instanceIsNotInCorrectState`;
      this.message = "Instance is not a valid state.";
    }
  },
  RoomDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Join.UC_CODE}roomDoesNotExist`;
      this.message = "Room does not exist.";
    }
  },
};

const Start = {
  UC_CODE: `${SvajpitoMainUseCaseError.ERROR_PREFIX}start/`,

  InvalidDtoIn: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Start.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InstanceDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Start.UC_CODE}InstanceDoesNotExist`;
      this.message = "Instance does not exist.";
    }
  },
  InstanceIsNotInCorrectState: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Start.UC_CODE}instanceIsNotInCorrectState`;
      this.message = "Instance is not a valid state.";
    }
  },
  RoomDoesNotExist: class extends SvajpitoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Start.UC_CODE}roomDoesNotExist`;
      this.message = "Room does not exist.";
    }
  },
};

module.exports = {
  Create,
  Get,
  List,
  Start,
  Join,
};
