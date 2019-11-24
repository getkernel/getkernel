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
      patch: Number(patch),
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
   * Returns string representation of the Version instance.
   */
  toString() {
    const { major, minor, patch, rc, distro } = this;
    let vString = `v${major}.${minor}`;
    if (patch) vString += `.${patch}`;
    if (rc) vString += `-${rc}`;
    if (distro) vString += `-${distro}`;
    return vString;
  }
}