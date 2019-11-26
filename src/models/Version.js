/**
 * Version class that implements static parse method and
 * overridden toString method.
 */
export default class Version {
  /* eslint-disable no-underscore-dangle, one-var-declaration-per-line, one-var */

  /**
   * Creates a Version object from a Version string
   * @param {String} versionString
   */
  constructor(versionString) {
    const versionObj = this.constructor.parse(versionString);

    // Attach properties to the instance.
    Object.keys(versionObj).forEach((key) => {
      this[`_${key}`] = versionObj[key];
    });
  }

  /**
   * Parses version string into an object.
   * @param {String} versionString Version string
   */
  static parse(versionString) {
    const regex = /^v?(\d+)\.(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?(?:-(rc\d*|ckt\d*))?(?:-(.+))?/i;
    let major, minor, build, patch, extra, rc, distro;
    try {
      [, major, minor, build, patch, extra, rc, distro] = versionString.match(
        regex,
      );
    } catch (error) {
      this._error = error.message;
    }

    return {
      major: Number(major),
      minor: Number(minor),
      build: build && Number(build),
      patch: patch && Number(patch),
      extra: extra && Number(extra),
      rc,
      distro,
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
