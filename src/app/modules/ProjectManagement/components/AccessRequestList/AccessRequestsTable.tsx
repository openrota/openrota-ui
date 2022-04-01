import React from 'react';
import Chip from '@mui/material/Chip';
import MUIDataTable from "mui-datatables";
import ContextMenu from '@app/components/ContextMenu/ContextMenu';
import { useModal } from '@app/context/modal-context';
import { InvitationStatus, RowAction, useGetAccessRequestByIdLazyQuery, useHandleAccessRequestActionsMutation } from '@app/models';
import objectToListViewer from '@app/utils/objectToListViewer';
import { Button, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';
import { RejectModalView } from '../ResourceRequestsList/RejectRequest';
export const AccessRequestsTable = ({ rows }) => {
    const { setModal, unSetModal } = useModal();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [getAccessRequestById] = useGetAccessRequestByIdLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const modalObj = [
                { key: "Requester's Email", value: data.accessRequestbyId?.emailId, render: () => <Link component="button" variant="body2">{data.accessRequestbyId?.emailId}</Link> },
                { key: "Reason", value: data.accessRequestbyId?.reason },
                { key: "Status", value: data.accessRequestbyId?.status }
            ];
            setModal({ title: "Access Request", modalBody: objectToListViewer(modalObj, ["id"]), modalFooter: <><Button autoFocus onClick={unSetModal}>Close</Button></> });
        }
    });
    const [handleAccessRequestAction] = useHandleAccessRequestActionsMutation({
        onCompleted: (data) => {
            if (data.handleAccessRequestActions?.status == InvitationStatus.Rejected) {
                enqueueSnackbar('The request has been rejected', {
                    variant: CHIPTYPE.SUCCESS
                });
            } else if (data.handleAccessRequestActions?.status == InvitationStatus.Completed) {
                enqueueSnackbar('The request has been approved', {
                    variant: CHIPTYPE.SUCCESS
                });

            }
            unSetModal();
            const index = rows.findIndex((row) => row.id == data.handleAccessRequestActions?.id);
            if (index != -1) {
                rows[index].status = data.handleAccessRequestActions?.status;
            }
        },
        onError: (data) => {
            enqueueSnackbar('Error while performing action!', {
                variant: CHIPTYPE.ERROR
            });
        }
    });

    const tableOptions = { selectableRows: "none", };
    const columns = [{
        name: "id",
        options: {
            display: "excluded",
            filter: false,
            sort: false,
        }
    }, {
        label: "Requester", name: "emailId",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <Link component="button" variant="body2">{value}</Link>
                );
            }
        }
    }, {
        label: "Reason", name: "reason",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        label: "Status", name: "status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <Chip label={value} color={(value == InvitationStatus.Completed ? CHIPTYPE.SUCCESS : CHIPTYPE.WARNING)} />
                );
            }
        }
    },
    {
        name: "Actions",
        sort: false,
        filter: false,
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                let actions = [
                    {
                        name: "View",
                        onClick: () => {
                            getAccessRequestById({ variables: { id: tableMeta.rowData[0] } })
                        }
                    }
                ];
                if (tableMeta.rowData[3] == InvitationStatus.Pending) {
                    actions = [...actions, {
                        name: "Approve",
                        onClick: () => {
                            handleAccessRequestAction({ variables: { actionName: RowAction.Approve, accessRequest: { id: tableMeta.rowData[0] } } })
                        }
                    },
                    {
                        name: "Reject", onClick: () => {
                            setModal({
                                composite: false,
                                title: "Request Rejection",
                                modalBody: <RejectModalView
                                    resourceRequestId={tableMeta.rowData[0]}
                                    onReject={(requestId, reason) => {
                                        handleAccessRequestAction({ variables: { actionName: RowAction.Reject, accessRequest: { id: tableMeta.rowData[0] } } })
                                    }} />
                            });

                        }
                    }];

                }
                return (
                    <ContextMenu actions={actions} />
                );
            }
        }
    }];
    return (
        <MUIDataTable data={rows} columns={columns} options={tableOptions} />
    )
}