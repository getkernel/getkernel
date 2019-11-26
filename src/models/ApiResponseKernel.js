import ApiResponseBase from './ApiResponseBase';

/**
 * Response class for kernel items.
 */
export default class ApiResponseKernel extends ApiResponseBase {
  /**
   * Creates a base object for the API response.
   * @param {String} baseUrl The url that response was originated from
   * @param {String} version Version name
   * @param {String} statusCode HTTP status code
   * @param {Boolean} success Successful or not
   */
  constructor(baseUrl, version, statusCode, success) {
    super(baseUrl, statusCode, success);
    this.data = {
      version,
      urls: {
        changes: `${baseUrl}/CHANGES`,
        checksums: `${baseUrl}/CHECKSUMS`,
        gpgKey: `${baseUrl}/CHECKSUMS.gpg`,
      },
      files: [],
    };
  }

  /**
   * Adds build data to data.files array.
   * @param {String} platform Build platform
   * @param {Boolean} buildStatus Build succeeded or not
   * @param {Array} binaries Array of binaries
   */
  addBuildData(platform, buildStatus, binaries) {
    this.data.files.push({
      platform,
      buildStatus,
      binaries,
      log: `BUILD.LOG.${platform}`,
    });
  }

  /**
   * Returns true if entries data is available, otherwise false.
   */
  isDataAvailable() {
    return !!this.data.files.length;
  }
}
