import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useGetProjectByIdLazyQuery, ProjectStatus, useCompleteProjectMutation } from '@app/models';
import Button from '@mui/material/Button';
import { CHIPTYPE } from '@app/constants';
import { CompleteProjectView } from './CompleteProjectView';
import { useModal } from '@app/context/modal-context';
import { useSnackbar } from 'notistack';
import objectToListViewer from '@app/utils/objectToListViewer';

const columns: GridColDef[] = [
  { field: 'key', headerName: 'Keys', width: 150 },
  { field: 'value', headerName: 'Values', width: 150 },
];

export const ProjectDetails = () => {
  const { setModal, unSetModal } = useModal();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [getProjectById, { data }] = useGetProjectByIdLazyQuery({
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    getProjectById({ variables: { id: Number(id) } });
  }, [getProjectById]);

  const [submitRequestAction] = useCompleteProjectMutation({
    onCompleted: (data) => {
      if (data.completeProject) {
        enqueueSnackbar('The request has been ' + data?.completeProject?.status, {
          variant: CHIPTYPE.SUCCESS,
        });
        unSetModal();
      }
    },
    onError: (data) => {
      enqueueSnackbar('Error while performing action!', {
        variant: CHIPTYPE.ERROR,
      });
    },
  });

  const rows = [
    { id: 1, key: 'Project Name', value: data?.getProjectById?.projectName },
    { id: 2, key: 'Business Unit', value: data?.getProjectById?.businessUnit },
    { id: 3, key: 'Project Start Date', value: data?.getProjectById?.slot?.startDate },
    { id: 4, key: 'Project End Date', value: data?.getProjectById?.slot?.endDate },
    {
      id: 5,
      key: 'Project Manager',
      value: data?.getProjectById?.projectManager?.firstName,
    },
    {
      id: 6,
      key: 'Resource',
      value: data?.getProjectById?.resourcerequest?.resource?.firstName,
    },
    {
      id: 7,
      key: 'Status',
      value: data?.getProjectById?.status,
    },
    {
      id: 8,
      key: 'Skills',
      value: data?.getProjectById?.resourcerequest?.skillSet,
    },
  ];
  return (
    <div style={{ height: '60vh', width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} /> */}
      {objectToListViewer(rows, ['id'])}
      <Button
        variant="contained"
        onClick={() => {
          setModal({
            composite: false,
            title: 'Submit Feedback',
            modalBody: (
              <CompleteProjectView
                projectId={Number(id)}
                onApprove={(projectId, comments) => {
                  submitRequestAction({
                    variables: {
                      projectId: projectId,
                      comments: comments,
                    },
                  });
                }}
              />
            ),
          });
        }}
      >
        Complete Project
      </Button>
    </div>
  );
};
