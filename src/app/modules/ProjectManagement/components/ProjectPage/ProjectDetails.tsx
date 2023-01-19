import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  useGetProjectByIdQuery,
  ProjectStatus,
  useCompleteProjectMutation,
  useGetProjectExtensionByProjectIdLazyQuery,
  useUpdateProjectExtensionMutation,
  useExtendProjectMutation,
  Maybe,
  RoleType,
} from '@app/models';
import Button from '@mui/material/Button';
import { CHIPTYPE } from '@app/constants';
import { CompleteProjectView } from './CompleteProjectView';
import { ExtendProjectView } from './ExtendProjectView';
import { useModal } from '@app/context/modal-context';
import { useSnackbar } from 'notistack';
import { useAuth } from '@app/context';
import objectToListViewer from '@app/utils/objectToListViewer';

export const ProjectDetails = () => {
  const { setModal, unSetModal } = useModal();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  let initRows: { id: number; key: string | undefined; value: string | Maybe<Maybe<string>[]> | undefined }[] = [];

  const [rows, setRows] = React.useState<any>(initRows);
  let extensionButton: JSX.Element | string = 'No extensions yet';
  useGetProjectByIdQuery({
    fetchPolicy: 'network-only',
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setRows([
        { id: 1, key: 'Project Name', value: data?.getProjectById?.projectName },
        { id: 2, key: 'Business Unit', value: data?.getProjectById?.businessUnit },
        {
          id: 3,
          key: 'Project Start Date',
          value: new Date(data?.getProjectById?.slot?.startDate).toLocaleDateString(),
        },
        { id: 4, key: 'Project End Date', value: new Date(data?.getProjectById?.slot?.endDate).toLocaleDateString() },
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
      ]);
    },
  });

  const [updateProjectExtensionAction] = useUpdateProjectExtensionMutation({
    onCompleted: (data) => {
      if (
        data?.updateProjectExtension?.id != null &&
        data?.updateProjectExtension?.status == ProjectStatus.Inprogress
      ) {
        enqueueSnackbar('Project Extension request has been updated', {
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

  const [getProjectExtensionByProjectId] = useGetProjectExtensionByProjectIdLazyQuery({
    fetchPolicy: 'network-only',
    variables: { projectId: Number(id) },
    notifyOnNetworkStatusChange: true,
    onCompleted: (projectExtensionData) => {
      let modalObj: { key: string; value: Maybe<string> | undefined }[] = [];
      let extensionId: number;
      projectExtensionData?.getProjectExtensionByProjectId?.map((s, index) => {
        extensionId = s?.id;
        modalObj = [
          {
            key: 'Extended Date',
            value: new Date(s?.extendedDate).toLocaleDateString(),
          },
          { key: 'Reason For Extension', value: s?.reasonForExtension },
        ];
      });
      setModal({
        title: 'Extension Request',
        modalBody: objectToListViewer(modalObj, ['id']),
        modalFooter: (
          <>
            <Button
              autoFocus
              onClick={() => {
                updateProjectExtensionAction({
                  variables: {
                    projectExtension: {
                      status: ProjectStatus.ExtensionApproved,
                      id: extensionId,
                    },
                  },
                });
              }}
            >
              Approve
            </Button>
            <Button
              autoFocus
              onClick={() => {
                updateProjectExtensionAction({
                  variables: {
                    projectExtension: {
                      status: ProjectStatus.ExtensionDenied,
                      id: extensionId,
                    },
                  },
                });
              }}
            >
              Deny
            </Button>
          </>
        ),
      });
    },
  });

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

  const [extendProjectAction] = useExtendProjectMutation({
    onCompleted: (data) => {
      if (data?.extendProject?.id != null) {
        enqueueSnackbar('Project Extension request has been created', {
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

  if (auth?.getRoles()?.includes(RoleType.Requestor)) {
    if (rows[6]?.value == ProjectStatus.Inprogress) {
      extensionButton = (
        <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={() => {
            setModal({
              composite: false,
              title: 'Request Extension',
              modalBody: (
                <ExtendProjectView
                  projectId={Number(id)}
                  onSubmitExtendProject={(projectId, extendedDate, reasonForExtension) => {
                    extendProjectAction({
                      variables: {
                        projectExtension: {
                          project: {
                            id: projectId,
                          },
                          extendedDate: extendedDate,
                          reasonForExtension: reasonForExtension,
                        },
                      },
                    });
                  }}
                />
              ),
            });
          }}
        >
          Extend Project
        </Button>
      );
    }
  } else if (auth?.getRoles()?.includes(RoleType.Manager) && rows[6]?.value == ProjectStatus.ExtensionRequested) {
    extensionButton = (
      <Button
        sx={{ m: 2 }}
        variant="contained"
        onClick={() => {
          getProjectExtensionByProjectId({ variables: { projectId: Number(id) } });
        }}
      >
        View Extension Requests
      </Button>
    );
  }

  return (
    <div style={{ height: '60vh', width: '100%' }}>
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
      {extensionButton}
    </div>
  );
};
