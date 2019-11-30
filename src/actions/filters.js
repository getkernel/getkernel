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
 * setSelectedVersions action generator.
 * @param {Array} filters Filters array
 */
export const setSelectedVersions = (filters) => ({
  type: 'SET_SELECTED_VERSIONS',
  filters,
});

/**
 * setReleaseType action generator.
 * @param {String} filter Filter
 */
export const setReleaseType = (filter) => ({
  type: 'SET_RELEASE_TYPE',
  filter,
});
