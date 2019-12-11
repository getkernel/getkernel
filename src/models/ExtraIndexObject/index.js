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
}
