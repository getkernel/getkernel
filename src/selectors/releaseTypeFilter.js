export default (releaseType) => ({ version_slug }) => {
  let showRc = true;
  switch (releaseType) {
    case 'all':
      showRc = true;
      break;

    case 'stable':
      showRc = !version_slug.includes('-rc');
      break;

    case 'rc':
      showRc = version_slug.includes('-rc');
      break;
  }
  return showRc;
};
