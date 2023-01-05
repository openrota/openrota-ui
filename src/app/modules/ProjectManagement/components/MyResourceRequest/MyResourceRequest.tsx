import ContextMenu from '@app/components/ContextMenu/ContextMenu';
import PageTitle from '@app/components/PageTitle/PageTitle';
import { CHIPTYPE } from '@app/constants';
import { useAuth } from '@app/context';
import { useModal } from '@app/context/modal-context';
import { InvitationStatus, ResourceRequestStatus, RowAction, useGetResourceRequestByIdLazyQuery, useGetResourceRequestByIdQuery, useGetResourceRequestsByRequestorQuery, useGetResourceRequestsQuery, useHandleResourceRequestActionsMutation } from '@app/models';
import objectToListViewer from '@app/utils/objectToListViewer';
import { Button, Link } from '@mui/material';
import Chip from '@mui/material/Chip';
import MUIDataTable from "mui-datatables";
import { useSnackbar } from 'notistack';
import { default as React, useState } from 'react';

export const MyResourceRequests = () => {
    const { setModal, unSetModal } = useModal();
    const auth = useAuth();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const initRows = [];

    const [rows, setRows] = useState<any>(initRows);

    useGetResourceRequestsByRequestorQuery({
        fetchPolicy: 'network-only',
        skip: auth?.getEmployeeId() == null || auth?.getEmployeeId() == undefined,
        variables: {
            id: auth?.getEmployeeId()
        },
        onCompleted: (data) => {
            setRows(data?.sharedResourceRequestByRequestorId?.map((s, index) => {
                return {
                    id: s?.id,
                    project: s?.project,
                    employee: s?.resource?.firstName,
                    manager: s?.requester?.firstName,
                    businessUnit: s?.businessUnit,
                    startDate: (new Date(s?.startDate)).toLocaleDateString(),
                    endDate: (new Date(s?.endDate)).toLocaleDateString(),
                    status: s?.status
                }
            }));
        },
    });

    const [getResourceRequestById] = useGetResourceRequestByIdLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const modalObj = [
                { key: "Project", value: data.sharedResourceRequestById?.project },
                { key: "Manager", value: data.sharedResourceRequestById?.requester?.firstName, render: () => <Link component="button" variant="body2">{data.sharedResourceRequestById?.requester?.firstName}</Link> },
                { key: "Business unit", value: data.sharedResourceRequestById?.businessUnit },
                { key: "Project Start Date", value: (new Date(data.sharedResourceRequestById?.startDate)).toLocaleDateString() },
                { key: "Project End Date", value: (new Date(data.sharedResourceRequestById?.endDate)).toLocaleDateString() },
                { key: "Skill Required", value: data.sharedResourceRequestById?.skillSet },
                { key: "Status", value: data.sharedResourceRequestById?.status, }
            ];
            setModal({ title: "Resource Request", modalBody: objectToListViewer(modalObj, ["id"]), modalFooter: <><Button autoFocus onClick={unSetModal}>Close</Button></> });
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
        label: "Project", name: "project",
        options: {
            filter: true,
            sort: true
        }
    }, {
        label: "Employee", name: "employee",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value) => {
                return (
                    (value ? value : "UNASSIGNED")
                );
            }
        }
    },
    {
        label: "Manager", name: "manager",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        label: "Business unit", name: "businessUnit",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        label: "Start Date", name: "startDate",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        label: "End Date", name: "endDate",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        label: "Status", name: "status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <Chip label={value} color={(value == ResourceRequestStatus.Completed ? CHIPTYPE.SUCCESS : CHIPTYPE.WARNING)} />
                );
            }
        }
    },
    {
        name: "Actions",
        options: {
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                let actions = [
                    {
                        name: "View",
                        onClick: () => {
                            getResourceRequestById({ variables: { id: tableMeta.rowData[0] } })
                        }
                    }
                ];
                return (
                    <ContextMenu actions={actions} />
                );
            }
        }
    }];
    return (
        <>
            <PageTitle title={"My resource request"} />
            <MUIDataTable data={rows} columns={columns} options={tableOptions} />
        </>


    )
}



