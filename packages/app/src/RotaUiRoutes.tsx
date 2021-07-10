import { PageSection } from '@patternfly/react-core';
import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import { ProjectManagement, CandidateManagement, ProjectsCalendar, CreateCandidate } from './components';
import Dash from './components/Dashboard';

type RotaUiRoutesProps = {
  getToken: Promise<string>;
  apiBasepath: string;
};

export const RotaUiRoutes: FunctionComponent<RotaUiRoutesProps> = ({ getToken, apiBasepath }) => {
  return (
    <AppContextProvider authToken={getToken} basePath={apiBasepath}>
      <Switch>
        <Route path={'/'} exact>
          <PageSection isFilled>
            <Dash />
          </PageSection>
        </Route>
        <Route path={'/candidate-management'}>
          <PageSection isFilled>
            <CandidateManagement />
          </PageSection>
        </Route>
        <Route path={'/create-candidate'}>
          <PageSection isFilled>
            <CreateCandidate />
          </PageSection>
        </Route>

        <Route path={'/project-management'}>
          <PageSection isFilled>
            <ProjectManagement />
          </PageSection>
        </Route>
        <Route path={'/projects-calendar'}>
          <PageSection isFilled>
            <ProjectsCalendar />
          </PageSection>
        </Route>
      </Switch>
    </AppContextProvider>
  );
};
