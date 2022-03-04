import PageTitle from '@app/components/PageTitle/PageTitle';
import { InvitationStatus, ResourceRequestStatus, useGetAllAccessRequestsQuery, useGetResourceRequestByIdLazyQuery, useGetResourceRequestsLazyQuery, useGetResourceRequestsQuery, useGetSkillsByRequestIdLazyQuery, useGetSkillsByRequestIdQuery } from '@app/models';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import { AccessRequestsTable } from './AccessRequestsTable';


const AccessRequestList: React.FC = () => {
    const [rows, setRows] = useState<any>([]);
    
    const { loading: loadingAccessRequestList, data: AccessRequestList } = useGetAllAccessRequestsQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setRows(data?.accessRequest?.map(s => { return { 
                emailId: <><a>{s?.emailId}</a></>, 
                reason: s?.reason, 
                status: 
                    <>
                        {s?.status == InvitationStatus.Completed && <Chip label={s?.status} color="success" />}
                        {s?.status == InvitationStatus.Pending && <Chip label={s?.status} color="warning" />}
                    </> 
                } 
            }));
        },
    });
    // function onSort(_event, index, direction) {
    //     const sortedRows = rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    //     setSortBy({
    //         index,
    //         direction
    //     });
    //     setRows(direction === SortByDirection.asc ? sortedRows : sortedRows.reverse());
    // }

    // function actionResolver(rowData, { rowIndex }) {

    //     let requestActions: any = [];
    //     console.log(rowData);
    //     requestActions = [{
    //         title: 'Approve',
    //         onClick: (event, rowId, rowData, extra) =>
    //             console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //     },
    //     {
    //         title: 'Reject',
    //         onClick: (event, rowId, rowData, extra) =>
    //             console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
    //     }];

    //     return [
    //         {
    //             title: 'View',
    //             onClick: (event, rowId, rowData, extra) => {
    //                 // getResourceRequestById({ variables: { id: rowData.rowId } })
    //                 // handleModalToggle();
    //                 // console.log(rowData);
    //             }
    //         },
    //         ...requestActions
    //     ];
    // }
    return (
        <>
            <PageTitle title={'Access requests'} />
            <AccessRequestsTable rows={rows}/>
        </>);
};

export default AccessRequestList;

