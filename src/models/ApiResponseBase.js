/**
 * Base class for API responses.
 */
export default class ApiResponseBase {
  /**
   * Creates a base object for the API response.
   * @param {String} baseUrl The url that response was originated from
   * @param {String} statusCode HTTP status code
   * @param {Boolean} success Successful or not
   */
  constructor(baseUrl, statusCode, success) {
    this.statusCode = statusCode || 200;
    this.success = success || true;
    this.data = {
      baseUrl: baseUrl || '',
    };
    this.error = null;
  }

  /**
   * Sets up a failed response.
   * @param {String} message Error message
   * @param {String} statusCode HTTP status code
   */
  setFailed(message, statusCode) {
    this.statusCode = statusCode || 500;
    this.success = false;
    this.error = {
      message,
    };
    this.data = null;
  }
}
