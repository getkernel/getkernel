/**
 * Action generators for filters.
 */

/**
 * setAvailableVersionsFilter action generator.
 * @param {Object} data Index data.
 */
export const setAvailableVersionsFilter = (data) => ({
  type: 'SET_AVAILABLE_VERSIONS_FILTER',
  data,
});

/**
 * setSelectedVersionsFilter action generator.
 * @param {Array} filters Filters array
 */
export const setSelectedVersionsFilter = (filters) => ({
  type: 'SET_SELECTED_VERSIONS_FILTER',
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
