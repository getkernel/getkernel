import './typedef';

/**
 * Class that models release objects returned from kernel.org api.
 */
export default class KernelOrgRelease {
  /**
   * Creates a new instance.
   * @param {Boolean} iseol Is EOL or not
   * @param {String} version Version string
   * @param {('mainline'|'stable'|'longterm'|'prepatch'|'linux-next')} moniker Kernel category
   * @param {String} source Source url
   * @param {String} pgp Pgp url
   * @param {Object} released Release date object
   * @param {Number} released.timestamp Timestamp of the release date
   * @param {String} released.isodate ISO string of the release date
   * @param {String} gitweb Git url
   * @param {String} changelog Changelog url
   * @param {String} diffview Diffview url
   * @param {Object} patch Patch object
   * @param {String} patch.full Full patch url
   * @param {String} patch.incremental Incremental patch url
   */
  constructor(
    iseol,
    version,
    moniker,
    source,
    pgp,
    released,
    gitweb,
    changelog,
    diffview,
    patch,
  ) {
    this.iseol = iseol;
    this.version = version;
    this.moniker = moniker;
    this.source = source;
    this.pgp = pgp;
    this.released = released;
    this.gitweb = gitweb;
    this.changelog = changelog;
    this.diffview = diffview;
    this.patch = patch;
  }

  /**
   * Creates a new instance from an object.
   * @param {Object} param0 Source object
   */
  static from({
    iseol,
    version,
    moniker,
    source,
    pgp,
    released,
    gitweb,
    changelog,
    diffview,
    patch,
  }) {
    return new this(
      iseol,
      version,
      moniker,
      source,
      pgp,
      released,
      gitweb,
      changelog,
      diffview,
      patch,
    );
  }
}
