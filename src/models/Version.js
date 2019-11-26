import moment from 'moment';
import { SERVER_DATE_FORMAT } from '../constants';

/**
 * Version class that implements static parse method and
 * overridden toString method.
 */
export default class Version {
  /* eslint-disable no-underscore-dangle, one-var-declaration-per-line, one-var */

  /**
   * Creates a Version object from a Version string.
   * @param {String} versionString Version string
   * @param {String} lastModified Last modified date
   */
  constructor(versionString, lastModified = '') {
    const versionObj = this.constructor.parse(versionString, lastModified);

    // Attach properties to the instance.
    Object.keys(versionObj).forEach((key) => {
      this[`_${key}`] = versionObj[key];
    });
  }

  /**
   * Parses version string into an object.
   * @param {String} versionString Version string
   * @param {String} lastModified Last modified date
   */
  static parse(versionString, lastModified = '') {
    const regex = /^v?(\d+)\.(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?(?:-(rc\d*|ckt\d*))?(?:-(.+))?/i;
    let major, minor, build, patch, extra, rc, distro, error;
    try {
      [, major, minor, build, patch, extra, rc, distro] = versionString.match(
        regex,
      );
    } catch (e) {
      error = e.message;
    }

    return {
      major: major && Number(major),
      minor: minor && Number(minor),
      build: build && Number(build),
      patch: patch && Number(patch),
      extra: extra && Number(extra),
      rc,
      distro,
      lastModified: lastModified
        ? moment(lastModified, SERVER_DATE_FORMAT)
        : moment(0),
      error,
    };
  }

  get major() {
    return this._major;
  }

  get minor() {
    return this._minor;
  }

  get build() {
    return this._build;
  }

  get patch() {
    return this._patch;
  }

  get extra() {
    return this._extra;
  }

  get rc() {
    return this._rc;
  }

  get distro() {
    return this._distro;
  }

  get ckt() {
    return this._rc;
  }

  get lastModified() {
    return this._lastModified;
  }

  get error() {
    return this._error;
  }

  /* eslint-enable no-underscore-dangle, one-var-declaration-per-line, one-var */

  /**
   * Returns true if the version belongs to a Release Candidate,
   * otherwise false.
   */
  isRC() {
    return !!this.rc && this.rc.toLowerCase().includes('rc');
  }

  /**
   * Returns true if the version belongs to a release that is
   * marked as CKT, otherwise false.
   */
  isCKT() {
    return !!this.rc && this.rc.toLowerCase().includes('ckt');
  }

  /**
   * Returns formatted last modified date.
   * @param {String} format Format string
   */
  toFormattedLastModified(format = 'L LT') {
    return this.lastModified.format(format);
  }

  /**
   * Returns the string representation of the Version instance.
   * @param {Boolean} withLeadingV Return value should include the leading "v" or not.
   * Defaults to true.
   */
  toString(withLeadingV = true) {
    const { rc, distro } = this;
    let str = this.toFriendlyString(withLeadingV);
    if (rc) str += `-${rc}`;
    if (distro) str += `-${distro}`;
    return str;
  }

  /**
   * Returns the string representation of the Version instance
   * in the form of v[Major].[Minor].[Build?].[Patch?].[Extra?].
   * @param {Boolean} withLeadingV Return value should include the leading "v" or not.
   * Defaults to true.
   */
  toFriendlyString(withLeadingV = true) {
    const { build, patch, extra } = this;
    let str = this.toShortString(withLeadingV);
    if (build) str += `.${build}`;
    if (patch) str += `.${patch}`;
    if (extra) str += `.${extra}`;
    return str;
  }

  /**
   * Returns the string representation of the Version instance
   * in the form of v[Major].[Minor].
   * @param {Boolean} withLeadingV Return value should include the leading "v" or not.
   * Defaults to true.
   */
  toShortString(withLeadingV = true) {
    const { major, minor } = this;
    const str = `${major}.${minor}`;
    return withLeadingV ? `v${str}` : str;
  }
}
