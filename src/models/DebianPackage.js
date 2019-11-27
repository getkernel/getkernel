/**
 * Class for storing binary file details.
 */
export default class DebianPackage {
  /**
   * Creates a DebianPackage object.
   * @param {String} fileName File name
   * @param {String} fileSize File size
   * @param {String} lastModified Last modified date
   * @param {String} sha1 SHA1 checksum of the file
   * @param {String} sha256 SHA256 checksum of the file
   */
  constructor(fileName, fileSize, lastModified, sha1, sha256) {
    this.fileName = fileName || '';
    this.fileSize = fileSize || '';
    this.lastModified = lastModified || '';
    this.sha1 = sha1 || '';
    this.sha256 = sha256 || '';
  }

  /**
   * Parses an object into a DebianPackage object.
   * @param {Object} param0 Source object
   */
  static parse({ fileName, fileSize, lastModified, sha1, sha256 }) {
    return new this(fileName, fileSize, lastModified, sha1, sha256);
  }
}
