import { DynamicFormRenderer, MessageDisplayerComponent } from '@app/components';
import { useAuth } from '@app/context';
import { useAccessrequestMutation, useCreateResourceRequestMutation, useGetSharedResourceByEmailIdLazyQuery, useSkillsQuery, useVerifyDesignationMutation } from '@app/models';
import resourceRequestSchema from '@app/modules/ProjectManagement/schema/request-access-form.json';
import { Alert, Button, Hint, HintBody, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
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
        <PageSection variant={PageSectionVariants.light}>
            <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                {saveAlertVisible && (
                    <Alert
                        variant="success"
                        title="Successfully saved"
                    />
                )}
                <Hint>
                    <HintBody>
                        You dont have access to request resources from openrota. Please submit the form or send email to
                        <Button variant="link" isInline>
                            admin@openrota.con
                        </Button>
                    </HintBody>
                </Hint>
                <br /><br />
                <DynamicFormRenderer schema={resourceRequestSchema} initialValues={formData} onSubmit={onSubmit} />
            </div>
        </PageSection>);
}

export default RequestAccessForm;
