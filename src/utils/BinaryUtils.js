import { ORIGIN } from '../constants';

/**
 * Utility methods for binary objects.
 */
export default class BinaryUtils {
  /**
   * Creates CHECKSUMS file for the given binaries.
   * @param {Array<BinaryPackage>} binaries Array of BinaryPackage objects
   * @param {String} version Version string
   * @param {String} platform Platform string
   */
  static buildChecksums(binaries, version, platform) {
    if (!binaries.length) {
      return null;
    }

    const fileName = `CHECKSUMS.${Date.now()}`;

    let text = '';
    const addLine = (str = '', newLinesAfter = 1) => {
      text += `${str}${'\n'.repeat(newLinesAfter)}`;
    };
    const addComment = (str = '', hashtagsBefore = 0, newLinesAfter = 1) => {
      let line = `# ${str}${'\n'.repeat(newLinesAfter)}`;
      if (hashtagsBefore > 0) {
        line = `${'#\n'.repeat(hashtagsBefore)}${line}`;
      }
      text += line;
    };

    addComment(
      `Checksums for ${version} (${platform}), check with the command below:`,
    );
    addComment(`shasum -c ${fileName}`);

    addComment('Checksums-Sha1:', 1);
    const sha1Part = binaries
      .map(({ fileName: file, sha1 }) => `${sha1}  ${file}`)
      .join('\n');
    addLine(sha1Part);

    addComment('Checksums-Sha256:', 1);
    const sha256Part = binaries
      .map(({ fileName: file, sha256 }) => `${sha256}  ${file}`)
      .join('\n');
    addLine(sha256Part);

    addComment(`${ORIGIN}/kernel/${version}`, 1);

    return {
      fileName,
      text,
    };
  }
}
