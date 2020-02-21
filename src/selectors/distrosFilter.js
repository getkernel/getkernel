export const distrosFilter = (filter) => (version) => {
  if (!version.distro) return false;

  const filterToken = `${version.distro}@${version.toShortString()}`;
  return filter.includes(filterToken);
};
