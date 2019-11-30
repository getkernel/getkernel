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

export default {
  releaseType: releaseTypes[0].value,
  availableVersions: [],
  selectedVersions: [null],
  availableDistros: [],
  selectedDistros: [null],
};
