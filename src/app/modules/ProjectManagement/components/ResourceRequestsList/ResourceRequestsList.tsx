import PageTitle from '@app/components/PageTitle/PageTitle';
import React from 'react';
import { ResourceRequestsTable } from './ResourceRequestsTable';


const ResourceRequestList: React.FC = () => {

    return (
        <>
            <PageTitle title={"Resource request"} />
            <ResourceRequestsTable />
        </>);
};
export default ResourceRequestList;

