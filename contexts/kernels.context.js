import React, { createContext } from 'react';
import { kernelsReducer } from '../reducers';
import { useLocalStorageReducer } from '../hooks';

export const KernelsContext = createContext();
export const DispatchContext = createContext();

const defaultState = {
  index: [],
  kernels: [],
};

export function KernelsProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    'getkernels',
    defaultState,
    kernelsReducer
  );

  return (
    <KernelsContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </KernelsContext.Provider>
  );
}
