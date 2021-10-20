import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '@patternfly/react-core/dist/styles/base.css';
import { AppLayout, Loading } from '@app/components';
import { AppRoutes } from '@app/routes';
import { initI18N } from '@i18n/i18n';
import { KeycloakAuthProvider, KeycloakContext, getKeycloakInstance } from '@app/auth/keycloak';
import '@app/app.css';

let keycloak: Keycloak.KeycloakInstance | undefined;

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
  });

  //Initialize the client
  React.useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      console.log('aaya ', keycloak);
      if (keycloak?.authenticated) {
        setInitialized(true);
      }
    };
    init();
  }, []);

  if (!initialized) return <Loading />;

  return (
    <ApolloProvider client={client}>
      <KeycloakContext.Provider value={{ keycloak, profile: keycloak?.profile }}>
        <KeycloakAuthProvider>
          <I18nextProvider i18n={initI18N()}>
            <React.Suspense fallback={<Loading />}>
              <Router>
                <AppLayout>
                  <AppRoutes />
                </AppLayout>
              </Router>
            </React.Suspense>
          </I18nextProvider>
        </KeycloakAuthProvider>
      </KeycloakContext.Provider>
    </ApolloProvider>
  );
};

export default App;
