import './typedef';
import ApiResponseBase from '../ApiResponseBase';
import ServerIndexObject from '../ServerIndexObject';
import Compare from '../../utils/Compare';

/**
 * Response class for index items.
 */
export default class ApiResponseIndex extends ApiResponseBase {
  /**
   * Creates an API response object.
   * @param {String} baseUrl The url that response was originated from
   * @param {String} statusCode HTTP status code
   * @param {Boolean} success Successful or not
   */
  constructor(baseUrl, statusCode, success) {
    super(baseUrl, statusCode, success);
    this.data.entries = [];
  }

  /**
   * Adds ServerIndexObject entry to data.entries array.
   * @param {String} versionName Version string
   * @param {String} lastModified Last modified date
   */
  addEntry(versionName, lastModified) {
    this.data.entries.push(new ServerIndexObject(versionName, lastModified));
  }

  /**
   * Sorts entries by date or versionName. Date by default.
   * @param {String} sortBy Sort entries by
   * @param {String} order Compare order (asc|desc). asc by default.
   */
  sortEntries(sortBy = 'date', order = 'asc') {
    switch (sortBy.toLowerCase()) {
      case 'date':
        this.data.entries.sort((a, b) =>
          Compare.date(order)(a.lastModified, b.lastModified),
        );
        break;

      case 'name':
      case 'versionName':
        this.data.entries.sort((a, b) =>
          Compare.string(order)(a.versionName, b.versionName),
        );
        break;

      default:
        break;
    }
  }

  /**
   * Returns true if entries data is available, otherwise false.
   */
  isDataAvailable() {
    return !!this.data.entries.length;
  }
}
