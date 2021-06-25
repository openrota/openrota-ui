import React, { createContext, FunctionComponent } from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { getKeyCloakToken, getParsedKeyCloakToken } from './keycloakAuth';
import { AuthContext, IAuthContext } from '../AuthContext';

// This is a context which can manage the keycloak
export interface IKeycloakContext {
  keycloak?: KeycloakInstance | undefined;
  profile?: KeycloakProfile | undefined;
}

export const KeycloakContext = createContext<IKeycloakContext>({
  keycloak: undefined,
});

export const KeycloakAuthProvider: FunctionComponent = props => {
  const getUsername = () => {
    return getParsedKeyCloakToken().then(token => (token as any)['username']);
  };

  const authTokenContext = {
    getToken: getKeyCloakToken,
    getUsername: getUsername,
  } as IAuthContext;
  return (
    <AuthContext.Provider value={authTokenContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
