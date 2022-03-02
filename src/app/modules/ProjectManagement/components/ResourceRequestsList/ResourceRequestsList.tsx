import React, { useState } from 'react';
import { useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import ViewResourceRequest from './ViewProjectModal';
import { ResourceRequestsTable } from './ResourceRequestsTable';
import Box from '@mui/material/Box';
import PageTitle from '@app/components/PageTitle/PageTitle';
import Modal from '@mui/material/Modal';


const ResourceRequestList: React.FC = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const initRows = [];

    const [rows, setRows] = useState<any>(initRows);
    const [showViewProfile, setShowViewProfile] = useState(false);
    const [showCandidateProfile, setShowCandidateProfile] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [getResourceRequestById, { data: resourceRequestById }] = useGetResourceRequestByIdLazyQuery();
    const { data: skillByRequestId } = useGetSkillsByRequestIdQuery({ skip: !resourceRequestById, variables: { id: resourceRequestById?.sharedResourceRequestById?.id } });


    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetResourceRequestsQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            skillByRequestId
            setRows(data?.sharedResourceRequest?.map((s, index) => {
                return {
                    project: s?.project,
                    employee: <a onClick={handleViewCandidateProfileModal}>Rishi</a>,
                    manager: s?.requester?.firstName,
                    pillar: s?.pillar,
                    startDate: s?.startDate,
                    endDate: s?.endDate,
                    status: s?.status
                }
            }));
        },
    });

    const handleViewCandidateProfileModal = (): void => {
        setShowCandidateProfile(!showCandidateProfile);
    };

    const handleModalToggle = (): void => {
        setShowViewProfile(!showViewProfile);
    };

    return (
        <>
            <PageTitle title={"Resource request"} />
            <ResourceRequestsTable rows={rows} getResourceRequestById={getResourceRequestById} handleModalToggle={handleModalToggle} />
            <Modal
                open={showViewProfile}
                onClose={handleModalToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ViewResourceRequest resourceRequestObject={resourceRequestById?.sharedResourceRequestById} skills={skillByRequestId?.getSkillsByRequestId} />
                </Box>
            </Modal>
        </>);
};
export default ResourceRequestList;

