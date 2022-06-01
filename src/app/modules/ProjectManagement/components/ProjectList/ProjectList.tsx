import PageTitle from '@app/components/PageTitle/PageTitle';
import React from 'react';
import { ProjectsTable } from './ProjectsTable';


const ProjectList: React.FC = () => {

    return (
        <>
            <PageTitle title={"Projects"} />
            <ProjectsTable />
        </>);
};
export default ProjectList;