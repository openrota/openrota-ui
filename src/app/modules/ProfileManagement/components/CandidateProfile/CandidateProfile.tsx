import { DynamicFormRenderer, Loading } from '@app/components';
import { useAuth } from '@app/context';
import { useCreateOrUpdateSharedResourceMutation, useGetSharedResourceByEmailIdLazyQuery, useGetSrByIdQuery, useSkillsQuery } from '@app/models';
import empSchema from '@app/modules/ProfileManagement/schema/emp-profile.json';
import Alert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';

const CandidateProfile: React.FC = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState({});
  const [skillsMap, setskillsMap] = useState({});
  const [saveAlertVisible, setSaveAlertVisible] = useState(false);
  const { loading, data } = useSkillsQuery();
  const [getSRByMail, { loading: SrbyMailLoading, data: srByMail }] = useGetSharedResourceByEmailIdLazyQuery();
  const { loading: loadingResource, data: resource } = useGetSrByIdQuery({
    skip: !srByMail,
    variables: { id: srByMail?.sharedResourceByEmailId?.id },
    onCompleted: (data) => {
      const map = {};
      const skills = data?.sharedResourceById?.skillProficiencies?.map(s => { map[s?.skill?.id] = s?.id; return s?.skill?.id });
      setskillsMap(map);
      setUserData({ ...userData, ...data?.sharedResourceById, skill: skills })
    }
  });

  const [addSharedResource, { data: saveResponse, loading: loadingSaveSR, error }] = useCreateOrUpdateSharedResourceMutation({
    onCompleted: (data) => {
      setSaveAlertVisible(true);
    },
  });

  useEffect(() => {
    auth?.getUserInfo().then(obj => {
      getSRByMail({ variables: { emailId: obj['email'] } });
      setUserData({ firstName: obj['firstName'], lastName: obj['lastName'] , emailId: obj['email']})
    });
  }, [])

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (values) => {
    const body = {
      id: values.id,
      totalExperience: values.totalExperience,
      designation: values.designation,
      emailId: values.emailId,
      employeeId: values.employeeId,
      firstName: values.firstName,
      lastName: values.lastName,
      skillProficiencies: values.skill.map(s => {
        return {
          id: (skillsMap[s] != null ? skillsMap[s] : null),
          skill: {
            id: s
          },
          proficiencyLevel: 'BEGINNER'
        }
      })
    };
  
    console.log(body);
    addSharedResource({ variables: { resource: body } });

  };

  const skillOptions = data?.skill?.map(s => ({ label: s?.name, value: s?.id }));


  const loadSkills = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

  const actionMapper = {
    loadSkills,
  };

  return (
    <>
      {saveAlertVisible && (
        <Alert severity="success">Successfully saved</Alert>
      )}
      <DynamicFormRenderer schema={empSchema} initialValues={userData} onSubmit={onSubmit} actionMapper={actionMapper} />
    </>);
};

export { CandidateProfile };

