import React, { lazy, useEffect } from 'react';
import { Route, useLocation, useNavigate, Routes } from 'react-router-dom';
//import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Loading, MessageDisplayerComponent } from '@app/components';
import { useVerifyInvitationMutation } from './models';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuth } from './context';
import TableEmptyData from './components/TableEmptyData/TableEmptyData';

const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ResourceManagement = lazy(() => import('@app/modules/ResourceManagement/ResourceManagement'));
const ProjectManagement = lazy(() => import('@app/modules/ProjectManagement/components/ProjectList/ProjectList'));
const ProjectPage = lazy(() => import('@app/modules/ProjectManagement/components/ProjectPage/ProjectPage'));
const NewResourceRequest = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestForm/ResourceRequestForm'));
const RequestAccessForm = lazy(() => import('@app/modules/ProjectManagement/components/RequestAccessForm/RequestAccessForm'));
const AccessRequestList = lazy(() => import('@app/modules/ProjectManagement/components/AccessRequestList/AccessRequestList'));
const ResourceRequestList = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestsList/ResourceRequestsList'));
const RoasterManagement = lazy(() => import('@app/modules/RoasterManagement/RoasterManagement'));
const ProfileManagement = lazy(() => import('@app/modules/ProfileManagement/ProfileManagement'));
const CandidateInvitation = lazy(() => import('@app/modules/ResourceManagement/components/CandidateInvitation/CandidateInvitation'));
const AppRoutes: React.FC = () => {
  let navigate = useNavigate();
  const { search } = useLocation();
  const auth = useAuth();
  const searchparams = new URLSearchParams(search);
  const [verifyToken, { data: verifyInvitation }] = useVerifyInvitationMutation({
    onCompleted: (data) => {
      console.log(data.verifyInvitation);
      if (data?.verifyInvitation?.responseStatus == 200) {
        navigate('profile-management');
      }
    },
  })

  useEffect(() => {
    console.log("search params", searchparams);

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
    return <MessageDisplayerComponent icon={AccessTimeIcon} mainMessage={verifyInvitation?.verifyInvitation?.responseText} title="Invalid Invitation" />
  }

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resource-management" element={<ResourceManagement />} />
        <Route path="project-management" element={<ProjectManagement />} />
        <Route path="roaster-management" element={<RoasterManagement />} />
        <Route path="profile-management" element={<ProfileManagement />} />
        <Route path="projects/:id" element={<ProjectPage />} />
        <Route path="create-resource-request" element={<NewResourceRequest />} />
        <Route path="view-resource-requests" element={<ResourceRequestList />} />
        <Route path="add-candidate" element={<CandidateInvitation />} />
        <Route path="request-access" element={<RequestAccessForm />} />
        <Route path="view-access-requests" element={<AccessRequestList />} />
        <Route path="*" element={<TableEmptyData />} />
      </Routes>

    </React.Suspense>
  );
};

export { AppRoutes };
