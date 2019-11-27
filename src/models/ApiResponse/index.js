import './typedef';

/**
 * Base class for an API response.
 */
export default class ApiResponse {
  /**
   * Creates an API response object.
   * @param {String} baseUrl The url that response was originated from
   * @param {Number} statusCode HTTP status code
   * @param {Boolean} success Successful or not
   */
  constructor(baseUrl, statusCode, success) {
    this.statusCode = statusCode || 200;
    this.success = success || true;
    this.data = {
      baseUrl: baseUrl || '',
      count: 0,
      results: [],
    };
    this.error = null;
  }

  /**
   * Adds arbitrary data to results.
   * @param {Object} data Data to be added
   */
  addData(data) {
    this.data.results.push(data);
    this.data.count += 1;
  }

  /**
   * Sorts data with the help of a comperator function.
   * @param {Function} comperator Comperator function
   */
  sortData(comperator) {
    if (typeof comperator === 'function') {
      this.data.results.sort(comperator);
    }
  }

  /**
   * Returns true if results data is available, otherwise false.
   */
  hasData() {
    return this.data.count > 0;
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
