import React, { createContext } from 'react';
import { kernelsReducer } from '../reducers';
import { useLocalStorageReducer } from '../hooks';
import defaultState from '../reducers/kernels.defaultState';

export const KernelsContext = createContext();
export const DispatchContext = createContext();

export function KernelsProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    'kernels',
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

export const withKernelsProvider = (Component) => (props) => (
  <KernelsProvider>
    <Component {...props} />
  </KernelsProvider>
);
