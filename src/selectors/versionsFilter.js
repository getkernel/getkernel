import Version from '../models/Version';

export default (versionFilters) => ({ version_slug }) => {
  const version = new Version(version_slug);
  return versionFilters.includes(version.toShortString());
};
