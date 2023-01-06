import ContextMenu from '@app/components/ContextMenu/ContextMenu';
import { CHIPTYPE } from '@app/constants';
import { useAuth } from '@app/context';
import { ProjectStatus, RoleType, useGetProjectsQuery, useGetProjectsByRequestorQuery, useProjectsByResourceQuery } from '@app/models';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import { default as React, useState } from 'react';
import { useNavigate } from 'react-router';

export const ProjectsTable = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const initRows = [];
  const [rows, setRows] = useState<any>(initRows);

  useGetProjectsQuery({
    fetchPolicy: 'network-only',
    skip: !auth?.getRoles()?.includes(RoleType.Manager),
    onCompleted: (data) => {
      setRows(
        data?.project?.map((s, index) => {
          return {
            id: s?.id,
            projectName: s?.projectName,
            businessUnit: s?.businessUnit,
            resource: s?.resourcerequest?.resource?.firstName,
            projectManager: s?.projectManager?.firstName,
            startDate: s?.slot?.startDate,
            endDate: s?.slot?.endDate,
            status: s?.status,
          };
        })
      );
    },
  });
  useGetProjectsByRequestorQuery({
    fetchPolicy: 'network-only',
    skip: !auth?.getRoles()?.includes(RoleType.Requestor),
    variables: { id: auth?.getEmployeeId() },
    onCompleted: (data) => {
      setRows(
        data?.projectsByRequestor?.map((s, index) => {
          return {
            id: s?.id,
            projectName: s?.projectName,
            businessUnit: s?.businessUnit,
            resource: s?.resourcerequest?.resource?.firstName,
            projectManager: s?.projectManager?.firstName,
            startDate: s?.slot?.startDate,
            endDate: s?.slot?.endDate,
            status: s?.status,
          };
        })
      );
    },
  });

  useProjectsByResourceQuery({
    fetchPolicy: 'network-only',
    skip: !auth?.getRoles()?.includes(RoleType.Resource),
    variables: { id: auth?.getEmployeeId() },
    onCompleted: (data) => {
      setRows(
        data?.projectsByResource?.map((s, index) => {
          return {
            id: s?.id,
            projectName: s?.projectName,
            businessUnit: s?.businessUnit,
            resource: s?.resourcerequest?.resource?.firstName,
            projectManager: s?.projectManager?.firstName,
            startDate: s?.slot?.startDate,
            endDate: s?.slot?.endDate,
            status: s?.status,
          };
        })
      );
    },
  });
  function resolveChipColor(text) {
    if (text == ProjectStatus.Completed) {
      return CHIPTYPE.SUCCESS;
    } else if (text == ProjectStatus.Pending) {
      return CHIPTYPE.WARNING;
    } else if (text == ProjectStatus.YetToStart) {
      return CHIPTYPE.INFO;
    }
  }
  const tableOptions = { selectableRows: 'none' };
  const columns = [
    {
      name: 'id',
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
      },
    },
    {
      label: 'Project Name',
      name: 'projectName',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Business Unit',
      name: 'businessUnit',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: 'Project Manager',
      name: 'projectManager',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Project Start Date',
      name: 'startDate',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Project End Date',
      name: 'endDate',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Resource',
      name: 'resource',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Status',
      name: 'status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <Chip
              label={value}
              color={resolveChipColor(value)}
            />
          );
        },
      },
    },
    {
      name: 'Actions',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let actions = [
            {
              name: 'View',
              onClick: () => {
                navigate('/projects/' + tableMeta.rowData[0], { replace: true });
              },
            },
          ];

          return <ContextMenu actions={actions} />;
        },
      },
    },
  ];
  return (
    <>
      <MUIDataTable data={rows} columns={columns} options={tableOptions} />
    </>
  );
};
