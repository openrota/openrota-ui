import { DynamicFormRenderer } from '@app/components';
import { CHIPTYPE } from '@app/constants';
import { useAuth } from '@app/context';
import {
  useCreateResourceRequestMutation,
  useGetSharedResourceByEmailIdLazyQuery,
  useIsResourceAccessAllowedLazyQuery,
  useSkillsQuery,
} from '@app/models';
import resourceRequestSchema from '@app/modules/ProjectManagement/schema/resource-request-form.json';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ResourceRequestForm: React.FC = () => {
  const Navigate = useNavigate();
  const auth = useAuth();
  const [skillsMap, setskillsMap] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [verifyAccess] = useIsResourceAccessAllowedLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      // In prod it will help us to validate only the designated people to be able to request the resource
      if (data?.isResourceAccessAllowed?.isgranted == false) {
        Navigate('/request-access', { replace: true });
      }
    },
  });

  const [addResourceRequest] = useCreateResourceRequestMutation({
    onCompleted: (data) => {
      if (data.createOrUpdateResourceRequest?.id != null) {
        enqueueSnackbar('Resource request has been created', {
          variant: CHIPTYPE.SUCCESS,
        });
        Navigate('/view-my-resource-requests', { replace: true });

        // Running optaplanner algorithm in parellel 
        fetch(process.env.OPENROTA_BACKEND_URL + '/rest/roster/solve');
      }
    },
    onError: (data) => {
      enqueueSnackbar('Error while performing action!', {
        variant: CHIPTYPE.ERROR,
      });
    },
  });
  const [getSRByMail, { data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
  const [formData, setFormData] = useState({});
  const { data: skills } = useSkillsQuery();

  useEffect(() => {
    auth?.getUserInfo().then((obj) => {
      getSRByMail({ variables: { emailId: obj['email'] } });
      verifyAccess({ variables: { email: obj['email'] } });
      setFormData({ requesterName: obj['firstName'], emailId: obj['email'] });
    });
  }, []);

  const skillOptions = skills?.skill?.map((s) => ({ label: s?.name, value: s?.name }));

  const loadSkills = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

  const actionMapper = {
    loadSkills,
  };

  const onSubmit = (values) => {
    const body = {
      requester: {
        id: auth?.getEmployeeId()
      },
      skillSet: values.skillSet,
      taskDetails: values.taskDetails,
      businessUnit: values.businessUnit,
      project: values.project,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    addResourceRequest({ variables: { resourceRequest: body } });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <div style={{ marginLeft: '20%', marginRight: '20%' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DynamicFormRenderer
            schema={resourceRequestSchema}
            initialValues={formData}
            onSubmit={onSubmit}
            actionMapper={actionMapper}
          />
        </LocalizationProvider>
      </div>
    </Box>
  );
};

export default ResourceRequestForm;
