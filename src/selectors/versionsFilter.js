export default (versionFilters) => ({ version_slug }) => {
  const [major, minor] = version_slug.split('.');
  let majorMinorString;
  if (minor && minor.includes('-')) {
    majorMinorString = `${major}.${minor.split('-')[0]}`;
  } else {
    majorMinorString = `${major}.${minor}`;
  }
  return versionFilters.includes(majorMinorString);
};
