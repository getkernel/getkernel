import './typedef';
import ApiResponseBase from '../ApiResponseBase';
import BuildObject from '../BuildObject';

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
    this.data.version = version;
    this.data.urls = {
      changes: `${baseUrl}/CHANGES`,
      checksums: `${baseUrl}/CHECKSUMS`,
      gpgKey: `${baseUrl}/CHECKSUMS.gpg`,
    };
    this.data.files = [];
  }

  /**
   * Adds build data to data.files array.
   * @param {String} platform Build platform
   * @param {Boolean} buildStatus Build succeeded or not
   * @param {Array<DebianPackage>} binaries Array of DebianPackage objects
   */
  addBuildData(platform, buildStatus, binaries) {
    this.data.files.push(new BuildObject(platform, buildStatus, binaries));
  }

  /**
   * Returns true if entries data is available, otherwise false.
   */
  isDataAvailable() {
    return !!this.data.files.length;
  }
}
