import Version from '../models/Version';

export default (releaseType) => ({ version_slug }) => {
  const version = new Version(version_slug);

  switch (releaseType) {
    case 'all':
      return true;

    case 'stable':
      return !version.isRC();

    case 'rc':
      return version.isRC();
  }
};
