export default (releaseType) => (version) => {
  switch (releaseType) {
    case 'all':
      return true;

    case 'stable':
      return !version.isRC();

    case 'rc':
      return version.isRC();

    default:
      return true;
  }
};
