export const setAvailableVersionsFilter = (data) => ({
  type: 'SET_AVAILABLE_VERSIONS_FILTER',
  data,
});

export const setSelectedVersionsFilter = (filters) => ({
  type: 'SET_SELECTED_VERSIONS_FILTER',
  filters,
});
