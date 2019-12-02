import './typedef';

/**
 * Base class for kernel.org api response.
 */
export default class KernelOrgResponse {
  /**
   * Creates a new instance.
   * @param {Object} latestStable Info about the latest stable release
   * @param {String} latestStable.version Version string
   * @param {Array<KernelOrgRelease>} releases Array of KernelOrgRelease objects
   */
  constructor(latestStable, releases) {
    this.latestStable = latestStable;
    this.releases = releases;
  }

  /**
   * Creates a new instance from an object.
   * @param {Object} obj Source object
   * @param {Object} obj.latest_stable Info about the latest stable release
   * @param {String} obj.latest_stable.version Version string
   * @param {Array<KernelOrgRelease>} obj.releases Array of KernelOrgRelease objects
   */
  static from(obj) {
    // eslint-disable-next-line camelcase
    const { latest_stable, releases } = obj;
    return new this(latest_stable, releases);
  }
}
