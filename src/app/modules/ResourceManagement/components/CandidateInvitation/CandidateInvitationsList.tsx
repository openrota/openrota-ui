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
    return (
        <>
            <CandidateInvitationsTable rows={invitations} />
        </>);
};
export default CandidateInvitationList;

