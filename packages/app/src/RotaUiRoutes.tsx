import { PageSection, PageSectionVariants, TextContent, Title, Text } from '@patternfly/react-core';
import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import { useTranslation } from 'react-i18next';
import { Dashboard, ProjectManagement, CandidateManagement, ProjectsCalendar, CreateCandidate } from './components'

type RotaUiRoutesProps = {
  getToken: Promise<string>;
  apiBasepath: string;
};

export const RotaUiRoutes: FunctionComponent<RotaUiRoutesProps> = ({
  getToken,
  apiBasepath,
}) => {
  // const history = useHistory();
  const { t } = useTranslation();
  return (
    <AppContextProvider authToken={getToken} basePath={apiBasepath}>
      <Switch>
        <Route path={'/'} exact>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Title headingLevel="h1">{t('titleDashboard')}</Title>
              <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
            </TextContent>
          </PageSection>
          <PageSection isFilled>
            <Dashboard />
          </PageSection>
        </Route>
        <Route path={'/candidate-management'} component={CandidateManagement} />
        <Route path={'/create-candidate'} component={CreateCandidate} />

        <Route path={'/project-management'}>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Title headingLevel="h1">{t('projectManagement')}</Title>
              <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
            </TextContent>
          </PageSection>
          <PageSection isFilled>
            <ProjectManagement />
          </PageSection>
        </Route>
        <Route path={'/projects-calendar'}>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Title headingLevel="h1">{t('projectsCalendar')}</Title>
              <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
            </TextContent>
          </PageSection>
          <PageSection isFilled>
            <ProjectsCalendar />
          </PageSection>
        </Route>
      </Switch>
    </AppContextProvider>
  );
};
