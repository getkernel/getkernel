/**
 * Filters reducer.
 */
import defaultState, { releaseTypes } from './defaultState';
import Version from '../../models/Version';
import Compare from '../../utils/Compare';

export { defaultState, releaseTypes };

export default (state, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_VERSIONS_FILTER':
      const availableVersions = [];
      const versions = action.data.entries
        .filter(({ version_slug }) => version_slug.startsWith('v'))
        .map(({ version_slug }) => new Version(version_slug));

      versions.forEach((version) => {
        if (!availableVersions.some(({ major }) => major === version.major)) {
          const minors = versions.filter((v) => v.major === version.major);
          // Sort minors in descending order.
          minors.sort(Compare.version('desc'));

          availableVersions.push({
            major: version.major,
            count: minors.length,
            minors: [...new Set(minors.map((m) => m.toShortString()))],
          });
        }
      });

      // Sort by major in descending order.
      availableVersions.sort(Compare.prop('major', 'desc'));

      return {
        ...state,
        availableVersions,
      };

    case 'SET_SELECTED_VERSIONS_FILTER':
      return {
        ...state,
        selectedVersions: action.filters,
        filtersSet: true,
      };

    case 'SET_RELEASE_TYPE':
      return {
        ...state,
        releaseType: action.filter,
      };

    default:
      return state;
  }
};
