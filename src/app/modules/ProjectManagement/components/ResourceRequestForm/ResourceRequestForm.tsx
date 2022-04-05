import { DynamicFormRenderer, MessageDisplayerComponent } from '@app/components';
import { useAuth } from '@app/context';
import { ResourceRequest, ResourceRequestInput, useCreateResourceRequestMutation, useGetSharedResourceByEmailIdLazyQuery, useSkillsQuery, useVerifyDesignationMutation } from '@app/models';
import resourceRequestSchema from '@app/modules/ProjectManagement/schema/resource-request-form.json';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';
const ResourceRequestForm: React.FC = () => {

    const history = useHistory();
    const auth = useAuth();
    const [skillsMap, setskillsMap] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [verifyDesignation] = useVerifyDesignationMutation({
        onCompleted: (data) => {
            // In prod it will help us to validate only the designated people to be able to request the resource
            // if (data?.verifyDesignation?.isgranted == false) {
            //     history.push("/request-access")
            // }
        },
    });

    const [addResourceRequest] = useCreateResourceRequestMutation({
        onCompleted: (data) => {
            enqueueSnackbar('Your request has been created sucessfully!', {
                variant: CHIPTYPE.SUCCESS
            });
            // setSaveAlertVisible(true);
        },
        onError: (data) => {
            enqueueSnackbar('Error while performing action!', {
                variant: CHIPTYPE.ERROR
            });
        }
    });
    const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
    const [saveAlertVisible, setSaveAlertVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const { data: skills } = useSkillsQuery();

    useEffect(() => {
        auth?.getUserInfo().then(obj => {
            getSRByMail({ variables: { emailId: obj['email'] } });
            verifyDesignation({ variables: { designation: "Associate Manageraaa, Software Engineering" } });
            setFormData({ requesterName: obj['firstName'], emailId: obj['email'] });
        });
    }, [])



    const skillOptions = skills?.skill?.map(s => ({ label: s?.name, value: s?.id }));


    const loadSkills = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

    const actionMapper = {
        loadSkills,
    };

    const onSubmit = (values) => {
        const body : ResourceRequestInput = {
            requester: {
                id: srByMail?.sharedResourceByEmailId?.id
            },
            skillProficiencies: values.skill.map(s => {
                return {
                    id: (skillsMap[s] != null ? skillsMap[s] : null),
                    skill: {
                        id: s
                    },
                    proficiencyLevel: 'BEGINNER'
                }
            }),
            taskDetails: values.taskDetails,
            pillar: values.pillar,
            project: values.project,
            startDate: values.startDate,
            endDate: values.endDate
        };
        addResourceRequest({ variables: { resourceRequest: body } });

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                {/* {saveAlertVisible && (
                    <Alert severity="success">Successfully saved</Alert>
                )} */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DynamicFormRenderer schema={resourceRequestSchema} initialValues={formData} onSubmit={onSubmit} actionMapper={actionMapper} />
                </LocalizationProvider>
            </div>
        </Box>);
}

export default ResourceRequestForm;
