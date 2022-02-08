import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
//import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Loading, MessageDisplayerComponent } from '@app/components';
import { useVerifyInvitationMutation } from './models';
import { SearchIcon, ThumbsUpIcon, TimesIcon } from '@patternfly/react-icons';
import { useAuth } from './context';

const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ResourceManagement = lazy(() => import('@app/modules/ResourceManagement/ResourceManagement'));
const ProjectManagement = lazy(() => import('@app/modules/ProjectManagement/ProjectManagement'));
const NewResourceRequest = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestForm/ResourceRequestForm'));
const RequestAccessForm = lazy(() => import('@app/modules/ProjectManagement/components/RequestAccessForm/RequestAccessForm'));
const AccessRequestList = lazy(() => import('@app/modules/ProjectManagement/components/AccessRequestList/AccessRequestList'));
const ResourceRequestList = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestsList/ResourceRequestsList'));
const RoasterManagement = lazy(() => import('@app/modules/RoasterManagement/RoasterManagement'));
const ProfileManagement = lazy(() => import('@app/modules/ProfileManagement/ProfileManagement'));
const CandidateInvitation = lazy(() => import('@app/modules/ResourceManagement/components/CandidateInvitation/CandidateInvitation'));
const AppRoutes: React.FC = () => {
  let history = useHistory();
  const { search } = useLocation();
  const auth = useAuth();
  const searchparams = new URLSearchParams(search);
  const [verifyToken, { data: verifyInvitation }] = useVerifyInvitationMutation({
    onCompleted: (data) => {
      console.log(data.verifyInvitation);
      if (data?.verifyInvitation?.responseStatus == 200) {
        history.push("/profile-management")
      }
    },
  })

  useEffect(() => {
    if (searchparams.get('token') && searchparams.get('emailId')) {
      auth?.getUserInfo().then(obj => {
        verifyToken({ variables: { emailId: searchparams.get('emailId'), token: searchparams.get('token'), name: obj['firstName'] } });
      });
    }
  }, []);

  if (verifyInvitation?.verifyInvitation?.responseStatus == 404) {
    return <MessageDisplayerComponent icon={SearchIcon} mainMessage={verifyInvitation?.verifyInvitation?.responseText} title="Not found" />
  }
  if (verifyInvitation?.verifyInvitation?.responseStatus == 400) {
    return <MessageDisplayerComponent icon={TimesIcon} mainMessage={verifyInvitation?.verifyInvitation?.responseText} title="Invalid Invitation" />
  }

  return (
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
        <Route path="/add-candidates" component={CandidateInvitation} />
        <Route path="/request-access" component={RequestAccessForm} />
        <Route path="/view-access-requests" component={AccessRequestList} />
      </Switch>
    </React.Suspense>
  );
};

export { AppRoutes };
