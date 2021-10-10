const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper: CoreValidationHelper } = require("uu_appg01_server").AppServer;

class ValidationHelper {
  constructor() {
    this.validator = Validator.load();
  }

  processValidation({ dtoIn, validationSchema, Errors, uuAppErrorMap = {} }) {
    const WARNINGS = {
      getUnsupportedKeys: {
        code: `${Errors.UC_CODE}unsupportedKeys`,
      },
    };

    let validationResult = this.validator.validate(validationSchema, dtoIn);
    uuAppErrorMap = CoreValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );
    return validationResult;
  }
}

module.exports = new ValidationHelper();
