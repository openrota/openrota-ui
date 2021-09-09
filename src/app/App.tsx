import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import '@patternfly/react-core/dist/styles/base.css';
import { AppLayout, Loading } from '@app/components';
import { AppRoutes } from '@app/routes';
import { initI18N } from '@i18n/i18n';
import { KeycloakAuthProvider, KeycloakContext, getKeycloakInstance } from '@app/auth/keycloak';
import '@app/app.css';
import { useVerifyTokenQuery } from '@app/models';

let keycloak: Keycloak.KeycloakInstance | undefined;
let tokenresponse: string | boolean | unknown;

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const token = params.get('token') as string;
  const email = params.get('email') as string;
  const { loading, error, data } = useVerifyTokenQuery({
    variables: {
      emailId: email,
      token: token,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      if (!loading && token && email) {
        tokenresponse = data?.verify;
        if (tokenresponse) {
          setInitialized(true);
        }
      }
      setInitialized(true);
    };
    init();
  }, [data]);

  if (!initialized) return <Loading />;

  return (
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
  );
};

export default App;
