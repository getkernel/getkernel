/**
 * Filters context.
 */
import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../hooks';
import filtersReducer, { defaultState } from '../reducers/filters';

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
