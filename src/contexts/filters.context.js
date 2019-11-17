import React, { createContext } from 'react';
import { filtersReducer } from '../reducers';
import { useLocalStorageReducer } from '../hooks';
import defaultState from '../reducers/filters.defaultState';

export const FiltersContext = createContext();
export const FiltersDispatchContext = createContext();

export function FiltersProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    'filters',
    defaultState,
    filtersReducer
  );

  return (
    <FiltersContext.Provider value={state}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}

export const withFiltersProvider = (Component) => (props) => (
  <FiltersProvider>
    <Component {...props} />
  </FiltersProvider>
);
