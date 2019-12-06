import { useRouter } from 'next/router';

/**
 * Creates a hook that uses query params to filter kernels.
 */
const useFilterNavigate = () => {
  const router = useRouter();

  const {
    query: { p, v, d, r, s, o },
  } = router;

  const DELIMETER = '-';

  const currentPage = p ? Number(p) : 1;
  const selectedVersions = v ? [null, ...v.split(DELIMETER)] : [null];
  const selectedDistros = d ? [null, ...d.split(DELIMETER)] : [null];
  const releaseType = r || '';
  const sortBy = s || 'version';
  const order = o || 'desc';

  /**
   * Navigates to the specified page and parses filters (if any).
   * @param {Number} page Page num to navigate to
   * @param {Object} param1 Additional param
   * @param {('versions'|'distros'|'releaseType'|'sortBy'|'order')} param1.key Param key
   * @param {Array|String} param1.value Param value
   */
  const navigate = (page = null, { key, value } = {}) => {
    const searchParams = new URLSearchParams(window.location.search);

    const setQueryParam = (keyX, valX) => {
      if (searchParams.has(keyX)) searchParams.set(keyX, valX);
      else searchParams.append(keyX, valX);
    };

    if (page) {
      setQueryParam('p', page);
    }

    if (key && value) {
      const keyStr = key[0].toLowerCase();
      let valueStr = value;
      if (Array.isArray(value)) {
        valueStr = value.join(DELIMETER);
      }
      setQueryParam(keyStr, valueStr);
    }

    searchParams.sort();

    // Remove unused params.
    const entries = searchParams.entries();
    let current = entries.next();
    while (!current.done) {
      const [keyY, valY] = current.value;
      if (!valY) searchParams.delete(keyY);
      current = entries.next();
    }

    router.push(`/kernels?${searchParams.toString()}`);
  };

  return {
    currentPage,
    selectedVersions,
    selectedDistros,
    releaseType,
    sortBy,
    order,
    navigate,
  };
};

export default useFilterNavigate;
