/**
 * Filters context.
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageReducer } from '../hooks';
import filtersReducer, { defaultState } from '../reducers/filters';

export const FiltersContext = createContext();
export const FiltersDispatchContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useLocalStorageReducer(
    'filters',
    defaultState,
    filtersReducer,
  );

  return (
    <FiltersDispatchContext.Provider value={dispatch}>
      <FiltersContext.Provider value={state}>
        {children}
      </FiltersContext.Provider>
    </FiltersDispatchContext.Provider>
  );
};

FiltersProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
