import React from 'react';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ContextMenu from '@app/components/ContextMenu/ContextMenu';
import { useModal } from '@app/context/modal-context';
import { InvitationStatus, useGetInvitationByIdLazyQuery, useResendInvitationMutation } from '@app/models';
import objectToListViewer from '@app/utils/objectToListViewer';
import { Button, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';

const CandidateInvitationsTable = ({ rows, updateRow }) => {
  const { setModal, unSetModal } = useModal();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [getInvitationById] = useGetInvitationByIdLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const inviteUrl = data.getInvitationById?.invitationLinkParams;
      const modalObj = [
        { key: 'Token Created At', value: data.getInvitationById?.createdAt },
        { key: 'Email', value: data.getInvitationById?.emailId },
        { key: 'Status', value: data.getInvitationById?.status },
      ];
      setModal({
        title: 'Candidate Invitation',
        modalBody: objectToListViewer(modalObj, ['id']),
        modalFooter: (
          <>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(inviteUrl);
                enqueueSnackbar('Copied Successfully!', { variant: CHIPTYPE.SUCCESS });
              }}
            >
              Copy Verification Link
            </Button>
            <Button autoFocus onClick={unSetModal}>
              Close
            </Button>
          </>
        ),
      });
    },
  });

  const [resendInvite] = useResendInvitationMutation({
    onCompleted: (data) => {
      if (data.resendInvitation?.id != null) {
        enqueueSnackbar('Invitation resent to candidate', {
          variant: CHIPTYPE.SUCCESS,
        });
        updateRow(data.resendInvitation?.id, data.resendInvitation);
      }
    },
  });

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
      label: 'Email',
      name: 'emailId',
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
        sort: false,
        customBodyRender: (value) => {
          return (
            <Chip label={value} color={value == InvitationStatus.Completed ? CHIPTYPE.SUCCESS : CHIPTYPE.WARNING} />
          );
        },
      },
    },
    {
      name: 'Actions',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const actions = [
            {
              name: 'View',
              onClick: () => {
                getInvitationById({ variables: { id: tableMeta.rowData[0] } });
              },
            },
            {
              name: 'Resend',
              onClick: () => {
                resendInvite({ variables: { id: tableMeta.rowData[0] } });
              },
            },
          ];
          return <ContextMenu actions={actions} />;
        },
      },
    },
  ];
  return <MUIDataTable data={rows} columns={columns} options={tableOptions} />;
};

export default CandidateInvitationsTable;
