/**
 * Abstract class
 */
class UuObject {
  /**
   * Constructor
   * @param Errors
   * @param uri
   */
  constructor({ Errors, uri }) {
    this.errors = Errors;
    this.data = {};
    this.uri = uri;
  }

}

module.exports = UuObject;
