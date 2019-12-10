import './typedef';
import Version from '../Version';
import BuildObject from '../BuildObject';

/**
 * Class that represents a kernel item with all related info.
 */
export default class Kernel {
  /**
   * Creates a new Kernel instance.
   * @param {String} version Version string
   * @param {String} kernelUrl The url of the kernel
   * @param {String} tag The tag that the kernel belongs to (optional).
   * @param {Array<BuildObject>} builds Array of BuildObject objects
   */
  constructor(version, kernelUrl, tag, builds) {
    this.version = version;
    this.kernelUrl = kernelUrl;
    this.tag = tag;
    this.urls = {
      changes: `${kernelUrl}/CHANGES`,
      checksums: `${kernelUrl}/CHECKSUMS`,
      gpgKey: `${kernelUrl}/CHECKSUMS.gpg`,
    };
    this.builds = builds || [];
  }

  /**
   * Parses an object into a Kernel object.
   * @param {Object} param0 Source object
   * @returns {Kernel} Kernel instance
   */
  static parse({ version, kernelUrl, tag, builds }) {
    return new this(version, kernelUrl, tag, builds);
  }

  /**
   * Adds build data to builds array.
   * @param {String} platform Build platform
   * @param {Boolean} buildStatus Build succeeded or not
   * @param {Array<DebianPackage>} binaries Array of DebianPackage objects
   */
  addBuild(platform, buildStatus, binaries) {
    this.builds.push(new BuildObject(platform, buildStatus, binaries));
  }

  /**
   * Returns true if Kernel object has build objects, otherwise false.
   */
  hasBuilds() {
    return this.builds.length > 0;
  }

  getVersion() {
    return new Version(this.version);
  }
}
