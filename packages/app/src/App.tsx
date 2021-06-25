import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import { Spinner } from '@patternfly/react-core';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { getKeycloakInstance } from './auth/keycloak/keycloakAuth';
import {
  KeycloakAuthProvider,
  KeycloakContext,
} from './auth/keycloak/KeycloakContext';
import { AppLayout } from './layout/AppLayout';
import { Loading } from '@openrota/utils';
import { RotaUiRoutes } from './RotaUiRoutes';
import { AuthContext } from './auth/AuthContext';

let keycloak: Keycloak.KeycloakInstance | undefined;

export const App: FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      setInitialized(true);
    };
    init();
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, profile: keycloak?.profile }}>
      <KeycloakAuthProvider>
        <I18nextProvider i18n={i18n}>
          <React.Suspense fallback={<Loading />}>
            <Router>
              <AppLayout>
                {initialized ? <ConnectedRoutes /> : <Spinner />}
              </AppLayout>
            </Router>
          </React.Suspense>
        </I18nextProvider>
      </KeycloakAuthProvider>
    </KeycloakContext.Provider>
  )
}
const ConnectedRoutes = () => {
  const authContext = useContext(AuthContext);

  return (
    <RotaUiRoutes
      getToken={
        authContext?.getToken ? authContext.getToken() : Promise.resolve('')
      }
      apiBasepath={process.env.BASE_PATH as string}
    />
  );
};