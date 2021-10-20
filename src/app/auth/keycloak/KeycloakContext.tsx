import React from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { getKeyCloakToken, getParsedKeyCloakToken } from './keycloakAuth';
import { Auth, AuthContext } from '@app/context';

// This is a context which can manage the keycloak
export interface IKeycloakContext {
  keycloak?: KeycloakInstance | undefined;
  profile?: KeycloakProfile | undefined;
}

export const KeycloakContext = React.createContext<IKeycloakContext>({ keycloak: undefined });

export const KeycloakAuthProvider: React.FunctionComponent = (props) => {
  const getUsername = () => {
    return getParsedKeyCloakToken().then((token) => token['username']);
  };

  const getUserInfo = () => {
    return getParsedKeyCloakToken().then((token) => { return { email: token['email'], firstName: token['first_name'], lastName: token['last_name'] } });
  };

  const authTokenContext = {
    getToken: getKeyCloakToken,
    getUsername,
    getUserInfo
  } as Auth;
  return <AuthContext.Provider value={authTokenContext}>{props.children}</AuthContext.Provider>;
};
