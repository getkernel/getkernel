import React, { createContext } from 'react';
import { globalReducer } from '../reducers';
import { useLocalStorageReducer } from '../hooks';
import defaultState from '../reducers/global.defaultState';

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

export const withGlobalProvider = (Component) => (props) => (
  <GlobalProvider>
    <Component {...props} />
  </GlobalProvider>
);
