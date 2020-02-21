/**
 * Global context.
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageReducer } from '../hooks';
import globalReducer, { defaultState } from '../reducers/global';

export const GlobalContext = createContext();
export const GlobalDispatchContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useLocalStorageReducer(
    'global',
    defaultState,
    globalReducer,
  );

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
