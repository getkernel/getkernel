/**
 * @typedef {Object} KernelOrgRelease
 * @property {Boolean} iseol Is EOL or not
 * @property {String} version Version string
 * @property {('mainline'|'stable'|'longterm'|'linux-next')} moniker Kernel category
 * @property {String} source Source url
 * @property {String} pgp Pgp url
 * @property {Object} released Release date object
 * @property {Number} released.timestamp Timestamp of the release date
 * @property {String} released.isodate ISO string of the release date
 * @property {String} gitweb Git url
 * @property {String} changelog Changelog url
 * @property {String} diffview Diffview url
 * @property {Object} patch Patch object
 * @property {String} patch.full Full patch url
 * @property {String} patch.incremental Incremental patch url
 */
