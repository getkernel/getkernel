/**
 * Action generators for filters.
 */

/**
 * setAvailableVersions action generator.
 * @param {Object} data Index data.
 */
export const setAvailableVersions = (data) => ({
  type: 'SET_AVAILABLE_VERSIONS',
  data,
});

/**
 * setAvailableDistros action generator.
 * @param {Object} data Index data.
 */
export const setAvailableDistros = (data) => ({
  type: 'SET_AVAILABLE_DISTROS',
  data,
});
