import './typedef';
import Version from '../Version';
import BuildObject from '../BuildObject';

/**
 * Class that represents a kernel item with all related info.
 */
export default class Kernel {
  /**
   * Creates a new Kernel instance.
   * @param {(String|Version)} version Version of the kernel
   * @param {String} kernelUrl The url of the kernel
   * @param {Array<BuildObject>} builds Array of BuildObject objects
   */
  constructor(version, kernelUrl, builds) {
    if (version instanceof Version) {
      this.version = version;
    } else {
      this.version = new Version(version);
    }
    this.kernelUrl = kernelUrl;
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
  static parse({ version, baseUrl, builds }) {
    return new this(version, baseUrl, builds);
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
}
