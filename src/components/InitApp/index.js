/**
 * InitApp component.
 */
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  GlobalDispatchContext,
  KernelsContext,
  KernelsDispatchContext,
  FiltersDispatchContext,
  KernelsProvider,
  FiltersProvider,
  withProvider,
} from '../../contexts';
import {
  hydrateIndexData,
  setAvailableVersions,
  setAvailableDistros,
  setIsLoading,
} from '../../actions';
import { getKernels } from '../../api';

const InitApp = () => {
  const router = useRouter();

  const {
    index: { items },
  } = useContext(KernelsContext);

  const globalDispatch = useContext(GlobalDispatchContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const filtersDispatch = useContext(FiltersDispatchContext);

  useEffect(() => {
    const getInitialData = async () => {
      const { success, data } = await getKernels();

      if (success) {
        kernelsDispatch(hydrateIndexData(data));
        filtersDispatch(setAvailableVersions(data));
        filtersDispatch(setAvailableDistros(data));
        globalDispatch(setIsLoading(false));

        // TODO: FIX THIS!!!
        router.reload();
      }
    };

    if (!items.length) {
      getInitialData();
      globalDispatch(setIsLoading(true));
    }
  }, [items.length, filtersDispatch, kernelsDispatch, router]);

  return null;
};

const withFiltersProvider = withProvider(FiltersProvider)(InitApp);
const withKernelsProvider = withProvider(KernelsProvider)(withFiltersProvider);

export default withKernelsProvider;
