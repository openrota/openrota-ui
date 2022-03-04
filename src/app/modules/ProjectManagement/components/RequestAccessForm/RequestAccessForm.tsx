import { DynamicFormRenderer, MessageDisplayerComponent } from '@app/components';
import { useAuth } from '@app/context';
import { useAccessrequestMutation, useCreateResourceRequestMutation, useGetSharedResourceByEmailIdLazyQuery, useSkillsQuery, useVerifyDesignationMutation } from '@app/models';
import resourceRequestSchema from '@app/modules/ProjectManagement/schema/request-access-form.json';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

const RequestAccessForm: React.FC = () => {
    const auth = useAuth();
    const [addAccessRequest] = useAccessrequestMutation({
        onCompleted: (data) => {
            setSaveAlertVisible(true);
        },
    });
    const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
    const [saveAlertVisible, setSaveAlertVisible] = useState(false);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        auth?.getUserInfo().then(obj => {
            getSRByMail({ variables: { emailId: obj['email'] } });
            setFormData({ requesterName: obj['firstName'], emailId: obj['email'] });
        });
    }, [])

    const onSubmit = (values) => {
        const body = {
            emailId: values.emailId,
            reason: values.reason
        };
        addAccessRequest({ variables: { accessRequest: body } });

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                {saveAlertVisible && (
                    <Alert severity="success">Successfully saved</Alert>
                )}
                <Paper variant="outlined" >
                    You dont have access to request resources from openrota. Please submit the form or send email to
                    <Button href="#text-buttons">
                        admin@openrota.com
                    </Button>
                </Paper>
                <br /><br />
                <DynamicFormRenderer schema={resourceRequestSchema} initialValues={formData} onSubmit={onSubmit} />
            </div>
        </Box>);
}

export default RequestAccessForm;
