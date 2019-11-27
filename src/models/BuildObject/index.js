import './typedef';

/**
 * Class for storing build objects by platform.
 */
export default class BuildObject {
  /**
   * Creates a new BuildObject object.
   * @param {String} platform Build platform
   * @param {Boolean} buildStatus Build succeeded or not
   * @param {Array<DebianPackage>} binaries Array of DebianPackage objects
   */
  constructor(platform, buildStatus, binaries) {
    this.platform = platform;
    this.buildStatus = buildStatus;
    this.binaries = binaries;
    this.log = `BUILD.LOG.${platform}`;
  }

  /**
   * Parses an object into a BuildObject object.
   * @param {Object} param0 Source object
   * @returns {BuildObject} BuildObject instance
   */
  static parse({ platform, buildStatus, binaries }) {
    return new this(platform, buildStatus, binaries);
  }
}
