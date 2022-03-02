import React, { useEffect, useState } from 'react';
import { InvitationStatus, useGetAllInvitationsQuery, useGetInvitationByIdLazyQuery } from '@app/models';
import CandidateInvitationsTable from './CandidateInvitationsTable';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface InvitationListProps {
    invitations: Array<any> | undefined | null;
}


const CandidateInvitationList: React.FC<InvitationListProps> = ({ invitations }) => {

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
    
    const [rows, setRows] = useState<any>([{ emailId: 'test', status: 'PENDING', rowId: 'us7982' }]);
    const [showViewProfile, setShowViewProfile] = useState(false);
    const [getInvitationById, { data: candidateInvitation }] = useGetInvitationByIdLazyQuery();

    useEffect(() => {
        setRows(invitations?.map(s => { return { 
            emailId: s?.emailId, 
            status: s?.status,
            rowId: s?.id 
        } }));
    }, [invitations]);

    const handleModalToggle = (): void => {
        setShowViewProfile(!showViewProfile);
    };

    return (
        <>
            <CandidateInvitationsTable rows={rows} handleModalToggle={handleModalToggle} />
            <Modal
                open={showViewProfile}
                onClose={handleModalToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        spacing={0.5}
                    >
                        <Typography variant="h6">Candidate Email</Typography>
                        <Typography >{candidateInvitation?.getInvitationById?.emailId}</Typography>
                        <Typography variant="h6">Sent On</Typography>
                        <Typography >{candidateInvitation?.getInvitationById?.createdAt}</Typography>
                        <Typography variant="h6">Token</Typography>
                        <Typography >{candidateInvitation?.getInvitationById?.token}</Typography>
                        <Typography variant="h6">Status</Typography>
                        <Typography >{candidateInvitation?.getInvitationById?.status}</Typography>
                    </Stack>
                </Box>
            </Modal>
        </>);
};
export default CandidateInvitationList;

