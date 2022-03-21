import { DynamicFormRenderer } from '@app/components';
import { useCreateInvitationMutation, useGetAllInvitationsLazyQuery } from '@app/models';
import resourceRequestSchema from '@app/modules/ResourceManagement/schema/invite-candidates-form.json';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import CandidateInvitationList from './CandidateInvitationsList';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';

const CandidateInvitation: React.FC = () => {
    const [invitations, setInvitations] = useState<any>([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [getAllInvitations] = useGetAllInvitationsLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setInvitations(data?.invitation);
        },
    });
    const [createInvitation] = useCreateInvitationMutation({
        onCompleted: (data) => {
            getAllInvitations();
            enqueueSnackbar("Candidate invitation sent successfully", {
                variant: CHIPTYPE.SUCCESS
            });
        },
    });

    useEffect(() => {
        getAllInvitations();
    }, [])

    const onSubmit = (values): void => {
        const body = {
            emailId: values.emailId,
        };
        createInvitation({ variables: { invitation: body } });

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                <DynamicFormRenderer schema={resourceRequestSchema} onSubmit={onSubmit} />
                {invitations && invitations.length > 0 && <CandidateInvitationList invitations={invitations} />}
            </div>
        </Box>);
}

export default CandidateInvitation;
