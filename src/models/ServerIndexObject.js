import Version from './Version';

/**
 * Object definition for server's index listing.
 */
export default class ServerIndexObject {
  /**
   * Creates a new instance.
   * @param {String} versionName Version string
   * @param {String} lastModified Last modified date
   */
  constructor(versionName, lastModified) {
    this.versionName = versionName;
    this.lastModified = lastModified;
  }

  /**
   * Creates a new instance by parsing the values provided.
   * @param {String} versionName Version string
   * @param {String} lastModified Last modified date
   */
  static parse(versionName, lastModified) {
    return new this(versionName, lastModified);
  }

  /**
   * Creates a new instance by parsing an object.
   * @param {Object} param0 Server index object
   */
  static parseObj({ versionName, lastModified }) {
    return new this(versionName, lastModified);
  }

  /**
   * Returns the Version representation of the object.
   */
  toVersion() {
    return new Version(this.versionName, this.lastModified);
  }
}
