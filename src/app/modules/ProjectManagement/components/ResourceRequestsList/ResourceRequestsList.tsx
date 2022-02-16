import { ResourceRequestStatus, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import { Button, Label, Modal, ModalVariant, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { sortable, SortByDirection, TableHeader, TableText } from '@patternfly/react-table';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react';
import ViewResourceRequest from './ViewProjectModal';
import Table from '@mui/material/Table';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { TableDemo } from './TableDemo';

const initColumns = [
    { field: 'Project', headerName: 'Project', width: 250},
    { field: 'Employee', headerName: 'Employee', width: 250 },
    { field: 'Manager', headerName: 'Manager', width: 250 },
    { field: 'Pillar', headerName: 'Pillar', width: 250 },
    { field: 'Start Date', headerName: 'Start Date', width: 220 },
    { field: 'End Date', headerName: 'End Date', width: 220 },
    { field: 'Status', headerName: 'Status', width: 220 }
];

const initRows = [];

const ResourceRequestList: React.FC = () => {
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
            setRows(data?.sharedResourceRequest?.map(s => { return { rowId: s?.id, cells: [s?.project, <TableText><a onClick={handleViewCandidateProfileModal}>Rishi</a></TableText>, s?.requester?.firstName, s?.pillar, s?.startDate, s?.endDate, <TableText>{s?.status == ResourceRequestStatus.Completed && <Label color="green">{s?.status}</Label>}{s?.status == ResourceRequestStatus.Pending && <Label color="red">{s?.status}</Label>}</TableText>] } }));
        },
    });
    function onSort(_event, index, direction) {
        const sortedRows = rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        setSortBy({
            index,
            direction
        });
        setRows(direction === SortByDirection.asc ? sortedRows : sortedRows.reverse());
    }

    function actionResolver(rowData, { rowIndex }) {

        let requestActions: any = [];

        if (rowData.status.title === "PENDING") {
            requestActions = [{
                title: 'Approve',
                onClick: (event, rowId, rowData, extra) =>
                    console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
            },
            {
                title: 'Reject',
                onClick: (event, rowId, rowData, extra) =>
                    console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
            }];
        }
        return [
            {
                title: 'View',
                onClick: (event, rowId, rowData, extra) => {
                    getResourceRequestById({ variables: { id: rowData.rowId } })
                    handleModalToggle();
                    console.log(rowData);
                }
            },
            ...requestActions
        ];
    }

    function handleViewCandidateProfileModal() {
        setShowCandidateProfile(!showCandidateProfile);
    };

    function handleModalToggle() {
        setShowViewProfile(!showViewProfile);
    };
    const irows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

      const icolumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 270 },
        { field: 'firstName', headerName: 'First name', width: 330 },
        { field: 'lastName', headerName: 'Last name', width: 330 },
        {
          field: 'age',
          headerName: 'Age',
          width: 290,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',   
          width: 360,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
    return (
        <>
            {/* <TableFilterToolbar /> */}
            {/* <PageSection variant={PageSectionVariants.light}> */}
            <div style={{ height: 400, width: '100%' }}>
                {/* <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={columns} rows={rows} actionResolver={actionResolver}>
                    <TableHeader />
                    <TableBody />
                </Table> */}
                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                /> */}
                <TableDemo rows={rows}/>
                <Modal
                    variant={ModalVariant.large}
                    title="Request Details"
                    isOpen={showViewProfile}
                    onClose={handleModalToggle}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={handleModalToggle}>
                            Confirm
                        </Button>,
                        <Button key="cancel" variant="link" onClick={handleModalToggle}>
                            Cancel
                        </Button>
                    ]}
                >
                    <ViewResourceRequest resourceRequestObject={resourceRequestById?.sharedResourceRequestById} skills={skillByRequestId?.getSkillsByRequestId} />
                </Modal>
            </div>

        </>);
};
export default ResourceRequestList;

