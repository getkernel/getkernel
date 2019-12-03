import './typedef';
import Checksum from '../Checksum';

/**
 * Class for storing binary file details.
 * @extends Checksum
 */
export default class BinaryPackage extends Checksum {
  /**
   * Creates a BinaryPackage object.
   * @param {String} fileName File name
   * @param {String} fileSize File size
   * @param {String} lastModified Last modified date
   * @param {String} sha1 SHA1 checksum of the file
   * @param {String} sha256 SHA256 checksum of the file
   */
  constructor(fileName, fileSize, lastModified, sha1, sha256) {
    super(fileName, sha1, sha256);
    this.fileSize = fileSize || '';
    this.lastModified = lastModified || '';
  }

  /**
   * Parses an object into a BinaryPackage object.
   * @param {Object} param0 Source object
   * @returns {BinaryPackage} BinaryPackage instance
   */
  static parse({ fileName, fileSize, lastModified, sha1, sha256 }) {
    return new this(fileName, fileSize, lastModified, sha1, sha256);
  }
}
