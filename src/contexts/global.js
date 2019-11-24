/**
 * Global context.
 */
import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../hooks';
import globalReducer, { defaultState } from '../reducers/global';

export const GlobalContext = createContext();
export const GlobalDispatchContext = createContext();

export function GlobalProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    'global',
    defaultState,
    globalReducer
  );

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
}