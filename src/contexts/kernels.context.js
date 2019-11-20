import React, { createContext } from 'react';
import { kernelsReducer } from '../reducers';
import { useLocalStorageReducer } from '../hooks';
import defaultState from '../reducers/kernels.defaultState';

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
