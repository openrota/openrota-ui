import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import '@patternfly/react-core/dist/styles/base.css';
import { AppLayout, Loading } from '@app/components';
import { AppRoutes } from '@app/routes';
import { initI18N } from '@i18n/i18n';
import { KeycloakAuthProvider, KeycloakContext, getKeycloakInstance } from '@app/auth/keycloak';
import '@app/app.css';
import { useVerifyTokenLazyQuery } from '@app/models';
import { useLocation, useParams } from 'react-router-dom';

let keycloak: Keycloak.KeycloakInstance | undefined;
let tokenresponse: string | boolean | unknown;

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const email = query.get('email');
  const [getVerify, { loading, error, data }] = useVerifyTokenLazyQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      // Gets tokenresponse from backend
      if (token && email) {
        getVerify({ variables: { emailId: email, token: token } });
        tokenresponse = data?.verify;
      }
      if (keycloak || tokenresponse) {
        setInitialized(true);
      }
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
