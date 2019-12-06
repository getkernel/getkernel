/**
 * Filters default state.
 */
export const releaseTypes = [
  {
    text: 'All',
    value: 'all',
  },
  {
    text: 'Stable release',
    value: 'stable',
  },
  {
    text: 'Release candidate',
    value: 'rc',
  },
];

export const sortByOptions = [
  {
    text: 'Version',
    value: 'version',
  },
  {
    text: 'Date',
    value: 'date',
  },
];

export default {
  availableVersions: [],
  availableDistros: [],
};
