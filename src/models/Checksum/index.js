import './typedef';

/**
 * Class for storing checksum details.
 */
export default class Checksum {
  /**
   * Creates a checksum object.
   * @param {String} fileName File name
   * @param {String} sha1 SHA1 checksum of the file
   * @param {String} sha256 SHA256 checksum of the file
   */
  constructor(fileName, sha1, sha256) {
    this.fileName = fileName || '';
    this.sha1 = sha1 || '';
    this.sha256 = sha256 || '';
  }

  /**
   * Parses a line of CHECKSUMS and returns a new Checksum object.
   * @param {String} line Line of text
   * @returns {Checksum} Checksum instance
   */
  static parseLine(line) {
    let sha1 = null;
    let sha256 = null;
    const [, sum, fileName] = line.match(
      /^(\b[a-f0-9]{40,64}\b)(?:\s+)(\b.*\b)/i,
    );
    if (sum.length === 40) sha1 = sum;
    if (sum.length === 64) sha256 = sum;
    return new this(fileName, sha1, sha256);
  }
}
