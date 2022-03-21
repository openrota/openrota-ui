import { useModal } from '@app/context/modal-context';
import { useGetAllSharedResourceQuery, useGetSrByIdLazyQuery } from '@app/models';
import objectToListViewer from '@app/utils/objectToListViewer';
import { Button, Chip, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import React, { useState } from 'react';
import ContextMenu from '@app/components/ContextMenu/ContextMenu';
const initRows = [];
const SharedResourceList: React.FC = () => {
    const [rows, setRows] = useState<any>(initRows);
    const { setModal, unSetModal } = useModal();

    const loadingSharedResourceList = useGetAllSharedResourceQuery({
        onCompleted: (data) => {
            setRows(data?.sharedResource?.map(s => { return { id: s?.id, name: s?.firstName, emailId: s?.emailId, designation: s?.designation, status: s?.status } }));
        },
    });

    const [getSRById] = useGetSrByIdLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const modalObj = [
                { key: "Name", value: data.sharedResourceById?.firstName },
                { key: "Email Id", value: data.sharedResourceById?.emailId },
                { key: "Designation", value: data.sharedResourceById?.designation },
                { key: "Status", value: data.sharedResourceById?.status },
                { key: "Total Experience", value: data?.sharedResourceById?.totalExperience },
                { key: "EmployeeId", value: data?.sharedResourceById?.employeeId },
                { key: "Skill Proficiencies", value: data?.sharedResourceById?.skillProficiencies?.map(skillObj => skillObj?.skill?.name).toString() },
            ];

            setModal({ title: "Candidate Profile", modalBody: objectToListViewer(modalObj, ["id"]), modalFooter: <><Button autoFocus onClick={unSetModal}>Close</Button></> });

        }
    });
    const tableOptions = { selectableRows: "none", };
    const columns = [{
        name: "id",
        options: {
            filter: false,
            sort: false,
            display: "excluded"
        }
    }, {
        label: "Name",
        name: "name",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta) => {
                return (
                    <Link component="button"
                        variant="body2"
                        onClick={() => {
                            getSRById({ variables: { id: parseInt(tableMeta.rowData[0]) } })
                        }}>{value}</Link>
                );
            }
        }
    }, {
        label: "Email", name: "emailId"
    },
    {
        label: "Designation", name: "designation"
    }, {
        label: "Status", name: "status",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <Chip label={value} color={(value == "AVAILABLE" ? "success" : "warning")} />
                );
            }
        }
    },
    {
        name: "Actions",
        sort: false,
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                const actions = [{ name: "View calender", onClick: () => { console.log(tableMeta.rowData) } }];
                return (
                    <ContextMenu actions={actions} />
                );
            }
        }
    }];
    return (
        <>
            <MUIDataTable data={rows} columns={columns} options={tableOptions} />
        </>);
};



export { SharedResourceList };

