import React, { useEffect, useState } from 'react';
import { useGetAllSharedResourceQuery } from '@app/models';
import { TableFilterToolbar } from '@app/components/TableFilterToolbar';
import ResourceListTable from './ResourceListTable';

const initRows = [];

const SharedResourceList: React.FC = () => {
   const [rows, setRows] = useState<any>(initRows);

    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetAllSharedResourceQuery({
        onCompleted: (data) => {
            setRows(data?.sharedResource?.map(s => { return {name:s?.firstName, emailId:s?.emailId, designation:s?.designation, skills:"", status:s?.status} }));
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

    //     console.log(rowData);

    //     const thirdAction =
    //         rowData.status.title === "UNAVAILABLE"
    //             ? [
    //                 {
    //                     isSeparator: true
    //                 },
    //                 {
    //                     title: 'Change Status',
    //                     onClick: (event, rowId, rowData, extra) =>
    //                         console.log(`clicked on Third action, on row ${rowId} of type ${rowData.type}`)
    //                 }
    //             ]
    //             : [];

    //     return [
    //         {
    //             title: 'View Profile Details',
    //             onClick: (event, rowId, rowData, extra) =>
    //                 console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //         },
    //         {
    //             title: <div>View Project Calender</div>,
    //             onClick: (event, rowId, rowData, extra) =>
    //                 console.log(`clicked on Another action, on row ${rowId} of type ${rowData.type}`)
    //         },
    //         ...thirdAction
    //     ];
    // }

    return (
        <>
            {/* <TableFilterToolbar /> */}
            {/* <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={columns} rows={rows} actionResolver={actionResolver}>
                <TableHeader />
                <TableBody />
            </Table> */}
            <ResourceListTable rows={rows}/>
        </>);
};

export { SharedResourceList };

