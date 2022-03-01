import { ResourceRequestStatus, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import ViewResourceRequest from './ViewProjectModal';
import { ResourceRequestsTable } from './ResourceRequestsTable';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const initColumns = [
    { field: 'Project', headerName: 'Project', width: 250 },
    { field: 'Employee', headerName: 'Employee', width: 250 },
    { field: 'Manager', headerName: 'Manager', width: 250 },
    { field: 'Pillar', headerName: 'Pillar', width: 250 },
    { field: 'Start Date', headerName: 'Start Date', width: 220 },
    { field: 'End Date', headerName: 'End Date', width: 220 },
    { field: 'Status', headerName: 'Status', width: 220 }
];



const ResourceRequestList: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('called')
        setAnchorEl(event?.currentTarget)
    }

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const initRows = [{
        project: 'text',
        employee: 'test',
        manager: 'manager',
        pillar: 'pillar',
        startDate: 'test',
        endDate: 'test',
        status: 'Pending',
        actions: (
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }];
    const [columns, setColumns] = useState(initColumns);
    const [filter, setFilter] = useState({ location: [], name: [], status: [] });
    const [rows, setRows] = useState<any>(initRows);
    const [sortBy, setSortBy] = useState({});
    const [showViewProfile, setShowViewProfile] = useState(false);
    const [showCandidateProfile, setShowCandidateProfile] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [getResourceRequestById, { data: resourceRequestById }] = useGetResourceRequestByIdLazyQuery();
    const { data: skillByRequestId } = useGetSkillsByRequestIdQuery({ skip: !resourceRequestById, variables: { id: resourceRequestById?.sharedResourceRequestById?.id } });


    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetResourceRequestsQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            skillByRequestId
            setRows(data?.sharedResourceRequest?.map(s => { return { rowId: s?.id, cells: [s?.project, <a onClick={handleViewCandidateProfileModal}>Rishi</a>, s?.requester?.firstName, s?.pillar, s?.startDate, s?.endDate, <>{s?.status == ResourceRequestStatus.Completed && <Chip label={s?.status} color="success" />}{s?.status == ResourceRequestStatus.Pending && <Chip label={s?.status} color="error" />}</>] } }));
        },
    });
    // function onSort(_event, index, direction) {
    //     const sortedRows = rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    //     setSortBy({
    //         index,
    //         direction
    //     });
    //     setRows(direction === SortByDirection.asc ? sortedRows : sortedRows.reverse());
    // }

    // function actionResolver(rowData, { rowIndex }) {

    //     let requestActions: any = [];

    //     if (rowData.status.title === "PENDING") {
    //         requestActions = [{
    //             title: 'Approve',
    //             onClick: (event, rowId, rowData, extra) =>
    //                 console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //         },
    //         {
    //             title: 'Reject',
    //             onClick: (event, rowId, rowData, extra) =>
    //                 console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //         }];
    //     }
    //     return [
    //         {
    //             title: 'View',
    //             onClick: (event, rowId, rowData, extra) => {
    //                 getResourceRequestById({ variables: { id: rowData.rowId } })
    //                 handleModalToggle();
    //                 console.log(rowData);
    //             }
    //         },
    //         ...requestActions
    //     ];
    // }

    const handleViewCandidateProfileModal = (): void => {
        setShowCandidateProfile(!showCandidateProfile);
    };

    const handleModalToggle = (): void => {
        setShowViewProfile(!showViewProfile);
    };

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <ResourceRequestsTable rows={rows} />
                <Modal
                    open={showViewProfile}
                    onClose={handleModalToggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ViewResourceRequest resourceRequestObject={resourceRequestById?.sharedResourceRequestById} skills={skillByRequestId?.getSkillsByRequestId} />
                </Modal>
            </div>

        </>);
};
export default ResourceRequestList;

