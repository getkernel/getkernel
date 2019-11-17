export default (state, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_VERSIONS_FILTER':
      const availableVersions = [];
      action.data.entries.forEach(({ version_slug }) => {
        const [versionMajor, versionMinor] = version_slug.split('.');
        if (versionMajor.includes('v')) {
          if (
            !availableVersions.some(({ version }) => version === versionMajor)
          ) {
            availableVersions.push({
              version: versionMajor,
              count: 0,
              minors: [],
            });
          }
          const versionObject = availableVersions.find(
            ({ version }) => version === versionMajor
          );
          const minorString = `${versionMajor}.${versionMinor.split('-')[0]}`;
          versionObject.count++;
          if (!versionObject.minors.includes(minorString)) {
            versionObject.minors.push(minorString);
          }
        }
      });

      // Sort versions by name - descending order
      if (availableVersions.length) {
        availableVersions.sort((a, b) => {
          // Sort minors
          a.minors.sort((i, j) => j.split('.')[1] - i.split('.')[1]);
          b.minors.sort((i, j) => j.split('.')[1] - i.split('.')[1]);
          return b.version[1] - a.version[1];
        });
      }

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
