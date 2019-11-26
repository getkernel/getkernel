export default (versionFilters) => (version) => {
  return versionFilters.includes(version.toShortString());
};
