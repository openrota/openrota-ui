import { Title } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon } from '@patternfly/react-icons';
import { Table, TableHeader, TableBody, sortable, SortByDirection } from '@patternfly/react-table';
import { useGetAllSharedResourceQuery } from '@app/models';
import { TableFilterToolbar } from '@app/components/TableFilterToolbar';

const initColumns = [
    { title: 'Name', transforms: [sortable] },
    'emailId',
    { title: 'Designation', transforms: [sortable] },
    'Skills',
    'Status'
];

const initRows = [];

const SharedResourceList: React.FC = () => {
    const [columns, setColumns] = useState(initColumns);
    const [filter, setFilter] = useState({ location: [], name: [], status: [] });
    const [rows, setRows] = useState<any>(initRows);
    const [sortBy, setSortBy] = useState({});


    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetAllSharedResourceQuery({
        onCompleted: (data) => {
            setRows(data?.sharedResource?.map(s => { return [s?.firstName, s?.emailId, s?.designation, "", s?.status] }));
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

        console.log(rowData);

        const thirdAction =
            rowData.status.title === "UNAVAILABLE"
                ? [
                    {
                        isSeparator: true
                    },
                    {
                        title: 'Change Status',
                        onClick: (event, rowId, rowData, extra) =>
                            console.log(`clicked on Third action, on row ${rowId} of type ${rowData.type}`)
                    }
                ]
                : [];

        return [
            {
                title: 'View Profile Details',
                onClick: (event, rowId, rowData, extra) =>
                    console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
            },
            {
                title: <div>View Project Calender</div>,
                onClick: (event, rowId, rowData, extra) =>
                    console.log(`clicked on Another action, on row ${rowId} of type ${rowData.type}`)
            },
            ...thirdAction
        ];
    }

    return (
        <>
            {/* <TableFilterToolbar /> */}
            <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={columns} rows={rows} actionResolver={actionResolver}>
                <TableHeader />
                <TableBody />
            </Table>
        </>);
};

export { SharedResourceList };

