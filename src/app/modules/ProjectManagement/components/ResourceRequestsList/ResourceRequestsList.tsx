import { ResourceRequestStatus, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import { Button, Label, Modal, ModalVariant, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { sortable, SortByDirection, Table, TableBody, TableHeader, TableText } from '@patternfly/react-table';
import React, { useState } from 'react';
import ViewResourceRequest from './ViewProjectModal';

const initColumns = [
    { title: 'Project', transforms: [sortable] },
    { title: 'Employee', transforms: [sortable] },
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
    return (
        <>
            {/* <TableFilterToolbar /> */}
            <PageSection variant={PageSectionVariants.light}>
                {/* <MyTable rows={} cells={} actions={actionResolver}/> */}
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
                    <ViewResourceRequest resourceRequestObject={resourceRequestById?.sharedResourceRequestById} skills={skillByRequestId?.getSkillsByRequestId} />
                </Modal>
            </PageSection>

        </>);
};
export default ResourceRequestList;

