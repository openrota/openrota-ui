import React from 'react';
import { DynamicFormRenderer, Loading } from '@app/components';
import { useSkillsQuery } from '@app/models';
import empSchema from '@app/modules/ResourceManagement/schema/emp-profile.json';

const CandidateProfile: React.FC = () => {
  const { loading, data } = useSkillsQuery();

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (values) => {
    console.log(values);
  };

  const skillOptions = data?.skill?.map((s) => ({ label: s.name, value: s.id }));

  const loadOptions = () => (_props, _field, formOptions) => ({ ..._props, options: skillOptions });

  const actionMapper = {
    loadOptions,
  };

  return <DynamicFormRenderer schema={empSchema} onSubmit={onSubmit} actionMapper={actionMapper} />;
};

export { CandidateProfile };
