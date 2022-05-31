import React, { lazy, useEffect } from 'react';
import { Route, useLocation, useNavigate, Routes } from 'react-router-dom';
import { Loading, MessageDisplayerComponent } from '@app/components';
import { useGetEmployeeByEmailIdLazyQuery, useVerifyInvitationMutation } from './models';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuth } from './context';
import TableEmptyData from './components/TableEmptyData/TableEmptyData';
import { ResolvedRoutes } from './utils/rolesHandler';

const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ProfileManagement = lazy(() => import('@app/modules/ProfileManagement/ProfileManagement'));
const UserManagement = lazy(() => import('@app/modules/ProfileManagement/components/UserManagement/UserManagement'));

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

  const [getCurrentEmployee, { data: loggedInEmployee }] = useGetEmployeeByEmailIdLazyQuery({
    onCompleted: (data) => {
      auth?.setEmployeeId(data.employeeByEmailId?.id);
    }
  });

  useEffect(() => {
    auth?.getUserInfo().then(obj => {
      if (searchparams.get('token') && searchparams.get('emailId')) {
        verifyToken({ variables: { emailId: searchparams.get('emailId'), token: searchparams.get('token'), name: obj['firstName'] } });
      }
      if (loggedInEmployee == null) {
        getCurrentEmployee({ variables: { emailId: obj['email'] } })
      } else {
        const roles = loggedInEmployee?.employeeByEmailId?.roles.map(r => r?.roleName);
        auth?.setRoles(roles);
      }
    });
    // auth?.setRoles([RoleType.Admin]);
  }, [loggedInEmployee]);

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
        <Route path="profile-management" element={<ProfileManagement />} />
        <Route path="user-management" element={<UserManagement />} />
        {ResolvedRoutes()}
        <Route path="*" element={<TableEmptyData />} />
      </Routes>
    </React.Suspense>
  );
};



export { AppRoutes };
