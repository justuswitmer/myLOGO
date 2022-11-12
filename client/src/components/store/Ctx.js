import React, { useReducer } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';

export const GlobalContext = React.createContext({});

export const Ctx = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  return (
    <GlobalContext.Provider data-test="global-context" value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Ctx;
