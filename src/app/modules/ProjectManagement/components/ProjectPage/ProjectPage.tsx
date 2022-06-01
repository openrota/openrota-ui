import PageTitle from '@app/components/PageTitle/PageTitle';
import React from 'react';
import { ProjectDetails } from './ProjectDetails';

const ProjectPage: React.FC = () => {
  return (
    <>
      <PageTitle title={'Project'} />
      <ProjectDetails />
    </>
  );
};
export default ProjectPage;
