export const setAvailableVersionsFilter = (data) => ({
  type: 'SET_AVAILABLE_VERSIONS_FILTER',
  data,
});

export const setSelectedVersionsFilter = (filters) => ({
  type: 'SET_SELECTED_VERSIONS_FILTER',
  filters,
});

export const setReleaseType = (filter) => ({
  type: 'SET_RELEASE_TYPE',
  filter,
});
