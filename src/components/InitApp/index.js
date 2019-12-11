/**
 * InitApp component.
 */
import { useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  GlobalContext,
  GlobalDispatchContext,
  KernelsDispatchContext,
  FiltersDispatchContext,
  KernelsProvider,
  FiltersProvider,
  withProvider,
} from '../../contexts';
import {
  hydrateIndexData,
  hydrateExtrasData,
  hydrateKernelOrgData,
  setAvailableVersions,
  setAvailableDistros,
  setBoolState,
  setIsLoading,
} from '../../actions';
import { getKernels, getExtras, getReleases } from '../../api';

const InitApp = () => {
  const router = useRouter();

  const { isInitialized } = useContext(GlobalContext);

  const globalDispatch = useContext(GlobalDispatchContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const filtersDispatch = useContext(FiltersDispatchContext);

  const getInitialData = useCallback(async () => {
    const { success, data } = await getKernels();
    const extrasResult = await getExtras();
    const releasesResult = await getReleases();

    if (success) {
      kernelsDispatch(hydrateIndexData(data));
      kernelsDispatch(hydrateExtrasData(extrasResult.data));
      kernelsDispatch(hydrateKernelOrgData(releasesResult.data));
      filtersDispatch(setAvailableVersions(data));
      filtersDispatch(setAvailableDistros(data));
      globalDispatch(setIsLoading(false));
      globalDispatch(setBoolState('isInitialized', true));

      // TODO: FIX THIS!!!
      router.reload();
    }
  });

  useEffect(() => {
    if (!isInitialized) {
      getInitialData();
      globalDispatch(setIsLoading(true));
    }
  }, [isInitialized, router]);

  return null;
};

const withFiltersProvider = withProvider(FiltersProvider)(InitApp);
const withKernelsProvider = withProvider(KernelsProvider)(withFiltersProvider);

export default withKernelsProvider;
