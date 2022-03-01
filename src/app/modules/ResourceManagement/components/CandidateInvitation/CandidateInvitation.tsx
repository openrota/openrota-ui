import { DynamicFormRenderer } from '@app/components';
import { useAuth } from '@app/context';
import { Invitation, Maybe, useCreateInvitationMutation, useGetAllInvitationsLazyQuery, useGetAllInvitationsQuery } from '@app/models';
import resourceRequestSchema from '@app/modules/ResourceManagement/schema/invite-candidates-form.json';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import CandidateInvitationList from './CandidateInvitationsList';

const CandidateInvitation: React.FC = () => {
    // const auth = useAuth();
    const [invitations, setInvitations] = useState<any>(undefined);
    const [getAllInvitations] = useGetAllInvitationsLazyQuery({
        fetchPolicy : 'network-only',
        onCompleted: (data) => {
            console.log('asa');

            setInvitations(data?.invitation);
        },
    });
    const [createInvitation, { data: invitationCreated }] = useCreateInvitationMutation({
        onCompleted: (data) => {
            console.log("inviains bna");

            getAllInvitations();
            setSaveAlertVisible({
                ...{
                    visible: true,
                    responseStatus: data?.createInvitationToken?.responseStatus
                }
            });
        },
    });
    const [saveAlertVisible, setSaveAlertVisible] = useState<any>({ visible: false, responseStatus: null });
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getAllInvitations();
    }, [])

    const onSubmit = (values) => {
        const body = {
            emailId: values.emailId,
        };
        createInvitation({ variables: { invitation: body } });

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                {saveAlertVisible?.visible && saveAlertVisible?.responseStatus == 200 && (
                    <Alert severity="success">Successfully saved</Alert>
                )}
                {saveAlertVisible?.visible && saveAlertVisible?.responseStatus == 409 && (
                    <Alert severity="error">Candidate is already invited!</Alert>
                )}
                <DynamicFormRenderer schema={resourceRequestSchema} initialValues={formData} onSubmit={onSubmit} />
                <CandidateInvitationList />
            </div>
        </Box>);
}

export default CandidateInvitation;
