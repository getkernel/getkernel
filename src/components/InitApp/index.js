/**
 * InitApp component.
 */
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  KernelsContext,
  KernelsDispatchContext,
  FiltersContext,
  FiltersDispatchContext,
  KernelsProvider,
  FiltersProvider,
  withProvider,
} from '../../contexts';
import {
  hydrateIndexData,
  setAvailableVersionsFilter,
  setSelectedVersionsFilter,
} from '../../actions';

const InitApp = () => {
  const router = useRouter();

  const {
    index: { items },
  } = useContext(KernelsContext);
  const { filtersSet, availableVersions } = useContext(FiltersContext);

  const kernelsDispatch = useContext(KernelsDispatchContext);
  const filtersDispatch = useContext(FiltersDispatchContext);

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch('http://localhost:3000/api/kernels');
      const json = await res.json();

      if (json.success) {
        kernelsDispatch(hydrateIndexData(json.data));
        filtersDispatch(setAvailableVersionsFilter(json.data));

        // TODO: FIX THIS!!!
        router.reload();
      }
    };

    if (!items.length) {
      getInitialData();
    }
  }, [items.length, filtersDispatch, kernelsDispatch, router]);

  useEffect(() => {
    if (!filtersSet && availableVersions.length) {
      // Set default filters to latest two minor versions of the latest kernel
      const [filterOne, filterTwo] = availableVersions[0].minors;
      filtersDispatch(setSelectedVersionsFilter([filterOne, filterTwo]));
    }
  }, [availableVersions, filtersDispatch, filtersSet]);

  return null;
};

const withFiltersProvider = withProvider(FiltersProvider)(InitApp);
const withKernelsProvider = withProvider(KernelsProvider)(withFiltersProvider);

export default withKernelsProvider;
