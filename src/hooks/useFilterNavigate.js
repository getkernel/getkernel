import { useRouter } from 'next/router';
import { KERNELS } from '../routes';

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
  const selectedVersions = v ? v.split(DELIMETER) : [];
  const selectedDistros = d ? d.split(DELIMETER) : [];
  const releaseType = r || 'all';
  const sortBy = s || 'version';
  const order = o || 'desc';

  /**
   * Returns URLSearchParams object that contains query params for
   * the current page.
   */
  const getSearchParams = () => {
    return new URLSearchParams(process.browser ? window.location.search : '');
  };

  /**
   * Loops over the entries of the given URLSearchParams object.
   * @param {URLSearchParams} urlSearchParams URLSearchParams object.
   * @param {Function} callback Callback function to call on every iteration.
   */
  const loopOverSearchParams = (urlSearchParams, callback) => {
    const entries = urlSearchParams.entries();
    let current = entries.next();
    while (!current.done) {
      const [key, value] = current.value;
      if (typeof callback === 'function') {
        callback(key, value);
      }
      current = entries.next();
    }
  };

  /**
   * Deletes query params that satisfy the given callback.
   * @param {URLSearchParams} urlSearchParams URLSearchParams object.
   * @param {Function} callback Comperator function to call on every iteration.
   */
  const deleteSearchParams = (urlSearchParams, callback) => {
    const keysToDelete = [];
    loopOverSearchParams(urlSearchParams, (key, value) => {
      if (callback(key, value)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((k) => urlSearchParams.delete(k));
  };

  /**
   * Sets a query parameter on the given URLSearchParams object.
   * @param {URLSearchParams} urlSearchParams URLSearchParams object
   * @param {String} key Query param key
   * @param {String} value Query param value
   */
  const setQueryParam = (urlSearchParams, key, value) => {
    const queryKey = key[0].toLowerCase();
    if (urlSearchParams.has(queryKey)) urlSearchParams.set(queryKey, value);
    else urlSearchParams.append(queryKey, value);
  };

  /**
   * Navigates to the specified page using filters (if any).
   * @param {Number} page Page num to navigate to
   * @param {Object} param1 Additional param
   * @param {('versions'|'distros'|'releaseType'|'sortBy'|'order')} param1.key Param key
   * @param {Array|String} param1.value Param value
   */
  const navigate = (page = null, { key, value } = {}) => {
    const searchParams = getSearchParams();

    if (page) {
      setQueryParam(searchParams, 'p', page);
    }

    if (key && value) {
      let valueStr = value;
      if (Array.isArray(value)) {
        valueStr = value.join(DELIMETER);
      }
      setQueryParam(searchParams, key, valueStr);
    }

    searchParams.sort();

    // Remove unused params.
    deleteSearchParams(searchParams, (_, val) => !val);

    router.push(`${KERNELS}?${searchParams.toString()}`);
  };

  /**
   * Returns filters' state.
   */
  const isFiltersSet = () => {
    const searchParams = getSearchParams();
    const keys = [];
    loopOverSearchParams(searchParams, (key) => {
      keys.push(key);
    });

    if (keys.length > 0) {
      if (keys.length === 1 && keys.includes('p')) {
        return false;
      }
      return true;
    }
    return false;
  };

  /**
   * Clears filters.
   */
  const clearFilters = () => {
    const searchParams = getSearchParams();

    // Remove search params except "p".
    deleteSearchParams(searchParams, (key, val) => key !== 'p' || !val);

    router.push(`${KERNELS}?${searchParams.toString()}`);
  };

  return {
    currentPage,
    selectedVersions,
    selectedDistros,
    releaseType,
    sortBy,
    order,
    navigate,
    isFiltersSet,
    clearFilters,
  };
};

export default useFilterNavigate;
