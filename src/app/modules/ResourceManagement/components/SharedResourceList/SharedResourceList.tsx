import React, { useState } from 'react';
import { useGetAllSharedResourceQuery } from '@app/models';
import ResourceListTable from './ResourceListTable';

const initRows = [];

const SharedResourceList: React.FC = () => {
   const [rows, setRows] = useState<any>(initRows);

    const { loading: loadingSharedResourceList, data: sharedResourceList } = useGetAllSharedResourceQuery({
        onCompleted: (data) => {
            setRows(data?.sharedResource?.map(s => { return {name:s?.firstName, emailId:s?.emailId, designation:s?.designation, skills:[], status:s?.status} }));
        },
    });
    return (
        <>
           <ResourceListTable rows={rows}/>
        </>);
};

export { SharedResourceList };

