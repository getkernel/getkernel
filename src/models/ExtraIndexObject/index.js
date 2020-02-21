import './typedef';
import ServerIndexObject from '../ServerIndexObject';
import Version from '../Version';

/**
 * Object definition for extra builds listing.
 */
export default class ExtraIndexObject extends ServerIndexObject {
  /**
   * Creates a new instance.
   * @param {String} versionName Version string
   * @param {String} lastModified Last modified date
   * @param {String} versionSlug Version slug
   * @param {String} tag Version tag
   */
  constructor(versionName, lastModified, versionSlug, tag) {
    super(versionName, lastModified);
    this.versionSlug = versionSlug;
    this.tag = tag;
  }

  /**
   * Creates a new instance by parsing an object.
   * @param {Object} param0 Source object
   * @returns {ExtraIndexObject} ExtraIndexObject instance
   */
  static parse({ versionName, lastModified, versionSlug, tag } = {}) {
    return new this(versionName, lastModified, versionSlug, tag);
  }

  /**
   * Returns the Version representation of the object.
   * @returns {Version} Version instance
   */
  toVersion() {
    return new Version(
      this.versionName,
      this.lastModified,
      this.versionSlug,
      this.tag,
    );
  }
}
