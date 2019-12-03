import './typedef';
import Compare from '../../utils/Compare';
import { BUILD_VARIANT_ALL } from '../../constants';

/**
 * Class for storing build objects by platform.
 */
export default class BuildObject {
  /**
   * Creates a new BuildObject object.
   * @param {String} platform Build platform
   * @param {Boolean} buildStatus Build succeeded or not
   * @param {Array<BinaryPackage>} binaries Array of BinaryPackage objects
   */
  constructor(platform, buildStatus, binaries) {
    this.platform = platform;
    this.buildStatus = buildStatus;
    this.binaries = binaries;
    this.log = `BUILD.LOG.${platform}`;
  }

  /**
   * Parses an object into a BuildObject object.
   * @param {Object} param0 Source object
   * @returns {BuildObject} BuildObject instance
   */
  static parse({ platform, buildStatus, binaries }) {
    return new this(platform, buildStatus, binaries);
  }

  /**
   * Returns build variants. (e.g. generic, lowlatency)
   */
  get variants() {
    const base = this.binaries.find(({ fileName }) =>
      fileName.endsWith('_all.deb'),
    );
    const rest = this.binaries.filter(
      ({ fileName }) => fileName !== base.fileName,
    );

    const variants = new Set();

    const tokenBase = base.fileName
      .replace('linux-headers-', '')
      .replace('_all.deb', '');

    const [tokenStart, tokenFinish] = tokenBase.split('_');

    rest.forEach(({ fileName }) => {
      const variant = fileName.substring(
        fileName.indexOf(tokenStart) + tokenStart.length + 1,
        fileName.indexOf(tokenFinish) - 1,
      );
      variants.add(variant);
    });

    const variantsArray = [...variants].sort(Compare.string());

    return [...variantsArray, BUILD_VARIANT_ALL];
  }
}
