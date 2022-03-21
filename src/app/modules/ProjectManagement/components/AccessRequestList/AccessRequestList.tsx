import PageTitle from '@app/components/PageTitle/PageTitle';
import { InvitationStatus, ResourceRequestStatus, useGetAllAccessRequestsQuery, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import { AccessRequestsTable } from './AccessRequestsTable';


const AccessRequestList: React.FC = () => {
    const [rows, setRows] = useState<any>([]);

    const loadingAccessRequestList = useGetAllAccessRequestsQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setRows(data?.accessRequest?.map(s => {
                return {
                    id: s?.id,
                    emailId: s?.emailId,
                    reason: s?.reason,
                    status: s?.status
                }
            }));
        },
    });

    return (
        <>
            <PageTitle title={'Access requests'} />
            <AccessRequestsTable rows={rows} />
        </>);
};

export default AccessRequestList;

