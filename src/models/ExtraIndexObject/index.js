import './typedef';
import ServerIndexObject from '../ServerIndexObject';

/**
 * Object definition for extra builds listing.
 */
export default class ExtraIndexObject extends ServerIndexObject {
  /**
   * Creates a new instance.
   * @param {String} versionName Version string
   * @param {String} versionSlug Version slug
   * @param {String} lastModified Last modified date
   */
  constructor(versionName, versionSlug, lastModified) {
    super(versionName, lastModified);
    this.versionSlug = versionSlug;
  }

  /**
   * Creates a new instance by parsing an object.
   * @param {Object} param0 Source object
   * @returns {ExtraIndexObject} ExtraIndexObject instance
   */
  static parse({ versionName, versionSlug, lastModified } = {}) {
    return new this(versionName, versionSlug, lastModified);
  }
}
