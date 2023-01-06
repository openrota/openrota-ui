import React, { lazy, useEffect } from 'react';
import { RoleType } from "@app/models";
import { Route } from 'react-router-dom';
import { MyResourceRequests } from '@app/modules/ProjectManagement/components/MyResourceRequest';
import MySchedule from '@app/modules/RoasterManagement/components/MySchedule';
import PrivateRoute from './PrivateRoute';
import { values } from 'cypress/types/lodash';
const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ResourceManagement = lazy(() => import('@app/modules/ResourceManagement/ResourceManagement'));
const ProjectManagement = lazy(() => import('@app/modules/ProjectManagement/components/ProjectList/ProjectList'));
const NewResourceRequest = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestForm/ResourceRequestForm'));
const RequestAccessForm = lazy(() => import('@app/modules/ProjectManagement/components/RequestAccessForm/RequestAccessForm'));
const AccessRequestList = lazy(() => import('@app/modules/ProjectManagement/components/AccessRequestList/AccessRequestList'));
const ResourceRequestList = lazy(() => import('@app/modules/ProjectManagement/components/ResourceRequestsList/ResourceRequestsList'));
const RoasterManagement = lazy(() => import('@app/modules/RoasterManagement/components/RoasterManagement'));
const ProfileManagement = lazy(() => import('@app/modules/ProfileManagement/ProfileManagement'));
const UserManagement = lazy(() => import('@app/modules/ProfileManagement/components/UserManagement/UserManagement'));
const CandidateInvitation = lazy(() => import('@app/modules/ResourceManagement/components/CandidateInvitation/CandidateInvitation'));

export const topLevelMenuResolver = {
    viewResourceRequest: {
        path: 'view-resource-requests',
        label: 'View Resource Requests',
        element: <ResourceRequestList />,
        rolesAllowed: [RoleType.Manager, RoleType.Admin],
    },
    viewAccessRequest: {
        path: 'view-access-requests',
        label: 'View Access Requests',
        element: <AccessRequestList />,
        rolesAllowed: [RoleType.Admin, RoleType.Manager]
    },
    createRequest: {
        path: 'create-resource-request',
        label: 'Create Resource request',
        element: <NewResourceRequest />,
        rolesAllowed: [RoleType.Requestor, RoleType.Admin, RoleType.Manager],
        public: true
    },
    createResourceInvitation: {
        path: 'add-candidate',
        label: 'Invite Resource',
        element: <CandidateInvitation />,
        rolesAllowed: [RoleType.Manager, RoleType.Admin]
    },
    viewMyRequest: {
        path: 'view-my-resource-requests',
        label: 'View My Resource Requests',
        element: <MyResourceRequests />,
        rolesAllowed: [RoleType.Requestor]
    },
    requestAccess: {
        path: 'request-access',
        label: 'Create Request Access',
        element: <RequestAccessForm />,
        rolesAllowed: []
    }
};

export const sideMenuResolver = {
    dashboard: {
        path: 'dashboard',
        element: <Dashboard />,
        rolesAllowed: [RoleType.Manager, RoleType.Admin, RoleType.Requestor, RoleType.Resource],
    },
    candidatelist: {
        path: 'resource-management',
        element: <ResourceManagement />,
        rolesAllowed: [RoleType.Admin, RoleType.Manager],
    },
    allProjects: {
        path: 'all-projects',
        element: <ProjectManagement />,
        rolesAllowed: [RoleType.Manager, RoleType.Admin],
    },
    myProjects: {
        path: 'my-projects',
        element: <ProjectManagement />,
        rolesAllowed: [RoleType.Requestor, RoleType.Resource],
    },
    resourceSchedule: {
        path: 'resource-schedule',
        element: <RoasterManagement />,
        rolesAllowed: [RoleType.Manager, RoleType.Admin],
    },
    mySchedule: {
        path: 'my-schedule',
        element: <MySchedule />,
        rolesAllowed: [RoleType.Resource]
    }
};

export function ResolvedRoutes() {
    return Object.entries({ ...topLevelMenuResolver, ...sideMenuResolver }).map(e => {
        const [key, value] = e;
        if (value.rolesAllowed != null && value.rolesAllowed.length != 0) {
            return <Route key={value.path} path={value.path} element={<PrivateRoute roles={value.rolesAllowed}>{value.element}</PrivateRoute>} />;
        }
        return <Route key={value.path} path={value.path} element={value.element} />
    });
}