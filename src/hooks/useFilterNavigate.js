/**
 * Creates a hook that uses query params to filter kernels.
 * @param {NextRouter} router NextRouter object
 */
const useFilterNavigate = (router) => {
  const {
    query: { p, v, d },
  } = router;

  const DELIMETER = ',';

  const currentPage = p ? Number(p) : 1;
  const selectedVersions = v ? [null, ...v.split(DELIMETER)] : [null];
  const selectedDistros = d ? [null, ...d.split(DELIMETER)] : [null];

  const navigate = (page = null, versions = null, distros = null) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (page) {
      if (searchParams.has('p')) searchParams.set('p', page);
      else searchParams.append('p', page);
    }

    if (versions) {
      const versionsStr = versions.join(DELIMETER);
      if (searchParams.has('v')) searchParams.set('v', versionsStr);
      else searchParams.append('v', versionsStr);
    }

    if (distros) {
      const distrosStr = distros.join(DELIMETER);
      if (searchParams.has('d')) searchParams.set('d', distrosStr);
      else searchParams.append('d', distrosStr);
    }

    searchParams.sort();

    // Remove unused params.
    const entries = searchParams.entries();
    let current = entries.next();
    while (!current.done) {
      const [key, value] = current.value;
      if (!value) searchParams.delete(key);
      current = entries.next();
    }

    router.push(`/kernels?${searchParams.toString()}`);
  };

  return { currentPage, selectedVersions, selectedDistros, navigate };
};

export default useFilterNavigate;
