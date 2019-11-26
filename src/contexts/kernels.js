/**
 * Kernels context.
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageReducer } from '../hooks';
import kernelsReducer, { defaultState } from '../reducers/kernels';

export const KernelsContext = createContext();
export const KernelsDispatchContext = createContext();

export const KernelsProvider = ({ children }) => {
  const [state, dispatch] = useLocalStorageReducer(
    'kernels',
    defaultState,
    kernelsReducer,
  );

  return (
    <KernelsContext.Provider value={state}>
      <KernelsDispatchContext.Provider value={dispatch}>
        {children}
      </KernelsDispatchContext.Provider>
    </KernelsContext.Provider>
  );
};

KernelsProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
