export default (distrosFilter) => (version) => {
  if (!version.distro) return false;

  const filterToken = `${version.distro}@${version.toShortString()}`;
  return distrosFilter.includes(filterToken);
};
