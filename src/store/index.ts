import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    screen: 'onboarding',
    user: null
  });

  const dispatch = (action: { type: string; [key: string]: any }) => {
    if (action.type === 'SET_SCREEN') {
      setState((prev) => ({ ...prev, screen: action.screen }));
    } else if (action.type === 'SIGNUP') {
      setState((prev) => ({ ...prev, user: action.user }));
    }
  };

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};
