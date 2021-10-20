import { DynamicFormRenderer } from '@app/components';
import { useAuth } from '@app/context';
import { useCreateResourceRequestMutation, useGetSharedResourceByEmailIdLazyQuery, useSkillsQuery } from '@app/models';
import resourceRequestSchema from '@app/modules/ProjectManagement/schema/resource-request-form.json';
import { Alert, PageSection, PageSectionVariants } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
const ResourceRequestForm: React.FC = () => {
    const auth = useAuth();
    const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
    const [saveAlertVisible, setSaveAlertVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const { data: skills } = useSkillsQuery();

    useEffect(() => {
        auth?.getUserInfo().then(obj => {
            getSRByMail({ variables: { emailId: obj['email'] } });
            setFormData({ requesterName: obj['firstName'], emailId: obj['email'] });
        });
    }, [])

    const [addResourceRequest] = useCreateResourceRequestMutation({
        onCompleted: (data) => {
            setSaveAlertVisible(true);
        },
    });

    const skillOptions = skills?.skill?.map(s => ({ label: s.name, value: s.id }));


    const loadSkills = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

    const actionMapper = {
        loadSkills,
    };

    const onSubmit = (values) => {
        const body = {
            requester: {
                id: srByMail?.sharedResourceByEmailId?.id
            },
            taskDetails: values.taskDetails,
            pillar: values.pillar,
            project: values.project,
            startDate: values.startDate,
            endDate: values.endDate
        };
        console.log(body);
        console.log(values);
        addResourceRequest({ variables: { resourceRequest: body } });

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
                <DynamicFormRenderer schema={resourceRequestSchema} initialValues={formData} onSubmit={onSubmit} actionMapper={actionMapper} />
            </div>
        </PageSection>);
}

export default ResourceRequestForm;
