/**
 * Version class that implements static parse method and
 * overridden toString method.
 */
export default class Version {
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
    const regex = /^v?(\d+)\.(\d+)(?:\.(\d+))?(?:-(rc\d+))?(?:-(\w+))?/i;
    let major, minor, patch, rc, distro;
    try {
      [, major, minor, patch, rc, distro] = versionString.match(regex);
    } catch (_) {}

    return {
      major: Number(major),
      minor: Number(minor),
      patch: patch && Number(patch),
      rc,
      distro,
    };
  }

  get major() {
    return this._major;
  }
  set major(_) {}

  get minor() {
    return this._minor;
  }
  set minor(_) {}

  get patch() {
    return this._patch;
  }
  set patch(_) {}

  get rc() {
    return this._rc;
  }
  set rc(_) {}

  get distro() {
    return this._distro;
  }
  set distro(_) {}

  /**
   * Returns true if the version belongs to a Release Candidate,
   * otherwise false.
   */
  isRC() {
    return !!this.rc;
  }

  /**
   * Returns the string representation of the Version instance.
   * @param {Boolean} withLeadingV Return value should include the leading "v" or not.
   * Defaults to true.
   */
  toString(withLeadingV = true) {
    const { major, minor, patch, rc, distro } = this;
    let str = `${major}.${minor}`;
    if (patch) str += `.${patch}`;
    if (rc) str += `-${rc}`;
    if (distro) str += `-${distro}`;
    return withLeadingV ? `v${str}` : str;
  }

  /**
   * Returns the string representation of the Version instance
   * in the form of v[Major].[Minor].
   * @param {Boolean} withLeadingV Return value should include the leading "v" or not.
   * Defaults to true.
   */
  toShortString(withLeadingV = true) {
    const { major, minor } = this;
    const shortStr = `${major}.${minor}`;
    return withLeadingV ? `v${shortStr}` : shortStr;
  }
}
