import { InvitationStatus, useGetAllInvitationsQuery, useGetInvitationByIdLazyQuery } from '@app/models';
import {
    Button, Label, Modal, ModalVariant, DescriptionList,
    DescriptionListTerm,
    DescriptionListGroup,
    DescriptionListDescription
} from '@patternfly/react-core';
import { sortable, SortByDirection, Table, TableBody, TableHeader, TableText, TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import CandidateInvitation from './CandidateInvitation';

interface InvitationListProps {
    invitations: Array<any> | undefined | null;
}

const initColumns = [
    { title: 'Email Id', transforms: [sortable] },
    { title: 'Status', transforms: [sortable] }
];
const columns = ['EmailId', 'Status'];

const initRows = [];

const CandidateInvitationList: React.FC<InvitationListProps> = ({ invitations }) => {
    const [rows, setRows] = useState<any>(initRows);
    const [sortBy, setSortBy] = useState({});
    const [showViewProfile, setShowViewProfile] = useState(false);
    const [getInvitationById, { data: candidateInvitation }] = useGetInvitationByIdLazyQuery();

    useEffect(() => {
        setRows(invitations?.map(s => { return { cells: [s?.emailId, <TableText>{s?.status == InvitationStatus.Completed && <Label color="green">{s?.status}</Label>}{s?.status == InvitationStatus.Pending && <Label color="red">{s?.status}</Label>}</TableText>], rowId: s?.id } }));
    }, [invitations]);

    function onSort(_event, index, direction) {
        const sortedRows = rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        setSortBy({
            index,
            direction
        });
        setRows(direction === SortByDirection.asc ? sortedRows : sortedRows.reverse());
    }
    function handleModalToggle() {
        setShowViewProfile(!showViewProfile);
    };

    function actionResolver(rowData, { rowIndex }) {
        let requestActions: any = [];
        console.log(rowData);

        if (rowData.status.title === "PENDING") {
            requestActions = [{
                title: 'Resend',
                onClick: (event, rowId, rowData, extra) =>
                    console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
            }];
        }
        return [
            {
                title: 'View details',
                onClick: (event, rowId, rowData, extra) => {
                    console.log(rowData);
                    getInvitationById({ variables: { id: rowData.rowId } })
                    handleModalToggle();
                }
            },
            ...requestActions
        ];
    }
    return (
        <>
            <Table aria-label="Sortable Table" sortBy={sortBy} onSort={onSort} cells={initColumns} rows={rows} actionResolver={actionResolver}>
                <TableHeader />
                <TableBody />
            </Table>
            <Modal
                variant={ModalVariant.large}
                title="Invitation Details"
                isOpen={showViewProfile}
                onClose={handleModalToggle}
                actions={[
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>
                ]}
            >
                <DescriptionList>
                    <DescriptionListGroup>
                        <DescriptionListTerm>Candidate Email</DescriptionListTerm>
                        <DescriptionListDescription>{candidateInvitation?.getInvitationById?.emailId}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                        <DescriptionListTerm>Sent On</DescriptionListTerm>
                        <DescriptionListDescription>{candidateInvitation?.getInvitationById?.createdAt}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                        <DescriptionListTerm>Token</DescriptionListTerm>
                        <DescriptionListDescription>{candidateInvitation?.getInvitationById?.token}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                        <DescriptionListTerm>Status</DescriptionListTerm>
                        <DescriptionListDescription>{candidateInvitation?.getInvitationById?.status}</DescriptionListDescription>
                    </DescriptionListGroup>
                </DescriptionList>
            </Modal>
        </>);
};
export default CandidateInvitationList;

