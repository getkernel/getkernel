export default (releaseType) => ({ version_slug }) => {
  switch (releaseType) {
    case 'all':
      return true;

    case 'stable':
      return !version_slug.includes('-rc');

    case 'rc':
      return version_slug.includes('-rc');
  }
};
