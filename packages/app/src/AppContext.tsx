import React, { createContext, FunctionComponent, useContext } from 'react';

type AppContextType = {
  authToken?: Promise<string>;
  basePath?: string;
};
const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: FunctionComponent<AppContextType> = ({
  authToken,
  basePath,
  children,
}) => (
  <AppContext.Provider value={{ authToken, basePath }}>
    {children}
  </AppContext.Provider>
);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used inside an AppContextProvider');

  return {
    ...context,
  };
};
