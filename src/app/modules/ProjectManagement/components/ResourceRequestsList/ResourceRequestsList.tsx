import { useGetResourceRequestsQuery } from '@app/models';
import { Button, Modal, ModalVariant, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { sortable, SortByDirection, Table, TableBody, TableHeader } from '@patternfly/react-table';
import React, { useState } from 'react';
import ViewResourceRequest from './ViewProjectModal';

const initColumns = [
    { title: 'Project', transforms: [sortable] },
    { title: 'Manager', transforms: [sortable] },
    { title: 'Pillar', transforms: [sortable] },
    'Start Date',
    'End Date',
    'Status',
];

const initRows = [];

const ResourceRequestList: React.FC = () => {
    const [columns, setColumns] = useState(initColumns);
    const [filter, setFilter] = useState({ location: [], name: [], status: [] });
    const [rows, setRows] = useState<any>(initRows);
    const [sortBy, setSortBy] = useState({});
    const [showViewProfile, setShowViewProfile] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);


    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetResourceRequestsQuery({
        onCompleted: (data) => {
            setRows(data?.sharedResourceRequest?.map(s => { return [s?.project, s?.requester?.firstName, s?.pillar, s?.startDate, s?.endDate, s?.status] }));
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


        // const thirdAction =
        // rowData.status.title === "PENDING"
        //     ? [
        //         {
        //             isSeparator: true
        //         },
        //         {
        //             title: 'Change Status',
        //             onClick: (event, rowId, rowData, extra) =>
        //                 console.log(`clicked on Third action, on row ${rowId} of type ${rowData.type}`)
        //         }
        //     ]
        //     : [];
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
                    handleModalToggle();
                    console.log(rowData);
                }
            },
            ...requestActions
        ];
    }

    function handleModalToggle() {
        setShowViewProfile(!showViewProfile);
    };
    return (
        <>
            {/* <TableFilterToolbar /> */}
            <PageSection variant={PageSectionVariants.light}>
                <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={columns} rows={rows} actionResolver={actionResolver}>
                    <TableHeader />
                    <TableBody />
                </Table>
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
                    <ViewResourceRequest requestId={selectedRequestId}/>
                </Modal>
            </PageSection>

        </>);
};
export default ResourceRequestList;

