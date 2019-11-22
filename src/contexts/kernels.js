/**
 * Kernels context.
 */
import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../hooks';
import kernelsReducer, { defaultState } from '../reducers/kernels';

export const KernelsContext = createContext();
export const KernelsDispatchContext = createContext();

export function KernelsProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    'kernels',
    defaultState,
    kernelsReducer
  );

  return (
    <KernelsContext.Provider value={state}>
      <KernelsDispatchContext.Provider value={dispatch}>
        {children}
      </KernelsDispatchContext.Provider>
    </KernelsContext.Provider>
  );
}
