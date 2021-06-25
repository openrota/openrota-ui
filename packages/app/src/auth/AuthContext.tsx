import { createContext } from 'react';

export interface IAuthContext {
  getToken: () => Promise<string>;
  getUsername: () => Promise<string>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
