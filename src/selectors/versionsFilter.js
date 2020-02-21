export const versionsFilter = (filter) => (version) => {
  return filter.includes(version.toShortString());
};
