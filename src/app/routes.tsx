import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { NotFound, Loading } from '@app/components';

const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ResourceManagement = lazy(() => import('@app/modules/ResourceManagement/ResourceManagement'));
const ProjectManagement = lazy(() => import('@app/modules/ProjectManagement/ProjectManagement'));
const NewResourceRequest = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestForm/ResourceRequestForm'));
const ResourceRequestList = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestsList/ResourceRequestsList'));
const RoasterManagement = lazy(() => import('@app/modules/RoasterManagement/RoasterManagement'));
const ProfileManagement = lazy(() => import('@app/modules/ProfileManagement/ProfileManagement'));
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/resource-management" component={ResourceManagement} exact />
          <Route path="/project-management" component={ProjectManagement} exact />
          <Route path="/roaster-management" component={RoasterManagement} />
          <Route path="/profile-management" component={ProfileManagement} />
          <Route path="/create-resource-request" component={NewResourceRequest} />
          <Route path="/view-resource-requests" component={ResourceRequestList} />

        </Switch>
      </React.Suspense>
    </Router>
  );
};

export { AppRoutes };
