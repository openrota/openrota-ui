import { InvitationStatus, ResourceRequestStatus, useGetAllAccessRequestsQuery, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import { AccessRequestsTable } from './AccessRequestsTable';

const initColumns = [
    // { title: 'Email Id', transforms: [sortable] },
    // { title: 'Reason' },
    // { title: 'Status' }
];

const initRows = [];

const AccessRequestList: React.FC = () => {
    const [columns, setColumns] = useState(initColumns);
    const [filter, setFilter] = useState({ location: [], name: [], status: [] });
    const [rows, setRows] = useState<any>(initRows);
    const [sortBy, setSortBy] = useState({});

    const { loading: loadingAccessRequestList, data: AccessRequestList } = useGetAllAccessRequestsQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setRows(data?.accessRequest?.map(s => { return { rowId: s?.id, cells: [<><a>{s?.emailId}</a></>, s?.reason, <>{s?.status == InvitationStatus.Completed && <Chip label={s?.status} color="success" />}{s?.status == InvitationStatus.Pending && <Chip label={s?.status} color="error" />}</>] } }));
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
    //     console.log(rowData);
    //     requestActions = [{
    //         title: 'Approve',
    //         onClick: (event, rowId, rowData, extra) =>
    //             console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //     },
    //     {
    //         title: 'Reject',
    //         onClick: (event, rowId, rowData, extra) =>
    //             console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //     }];

    //     return [
    //         {
    //             title: 'View',
    //             onClick: (event, rowId, rowData, extra) => {
    //                 // getResourceRequestById({ variables: { id: rowData.rowId } })
    //                 // handleModalToggle();
    //                 // console.log(rowData);
    //             }
    //         },
    //         ...requestActions
    //     ];
    // }
    return (
        <>
            {/* <TableFilterToolbar /> */}
            {/* <PageSection variant={PageSectionVariants.light}>
                <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={columns} rows={rows} actionResolver={actionResolver}>
                    <TableHeader />
                    <TableBody />
                </Table>
            </PageSection> */}
            <AccessRequestsTable rows={rows}/>
        </>);
};
export default AccessRequestList;

