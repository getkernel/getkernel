export default (versionsFilter) => (version) => {
  return versionsFilter.includes(version.toShortString());
};
