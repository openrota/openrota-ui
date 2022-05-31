import ContextMenu from '@app/components/ContextMenu/ContextMenu';
import { useModal } from '@app/context/modal-context';
import { Employee, useGetAllRolesQuery, useGetEmployeeByIdLazyQuery, useGetEmployeesQuery } from '@app/models';
import objectToListViewer from '@app/utils/objectToListViewer';
import { Button, Chip, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PageTitle from '@app/components/PageTitle/PageTitle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UserManagement = () => {
    const { setModal, unSetModal } = useModal();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [employees, setemployees] = useState<Employee | any>([]);

    useGetEmployeesQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setemployees(data?.employee);
        },
    });
    const [getEmployeeById] = useGetEmployeeByIdLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const modalObj = [
                { key: "Email", value: data.employeeById?.emailId, render: () => <Link component="button" variant="body2">{data.employeeById?.emailId}</Link> },
                { key: "First name", value: data.employeeById?.firstName },
                { key: "Last Name", value: data.employeeById?.lastName },
            ];
            setModal({ title: "Employee details", modalBody: objectToListViewer(modalObj, ["id"]), modalFooter: <><Button autoFocus onClick={unSetModal}>Close</Button></> });
        }
    });

    const tableOptions = { selectableRows: "none", };
    const columns = [{
        name: "id",
        options: {
            display: "excluded",
            filter: false,
            sort: false,
        }
    }, {
        label: "Email Id", name: "emailId",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <Link component="button" variant="body2">{value}</Link>
                );
            }
        }
    }, {
        label: "First Name", name: "firstName",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        label: "Last Name", name: "lastName",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        label: "Roles", name: "roles",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>{value != null && value.map(v => <Chip key={v.roleName} label={v.roleName} />)}</>
                );
            }
        }
    },
    {
        name: "Actions",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                let actions = [
                    {
                        name: "View",
                        onClick: () => {
                            getEmployeeById({ variables: { id: tableMeta.rowData[0] } })
                        }
                    },
                    {
                        name: "Manage Roles",
                        onClick: () => {
                            setModal({
                                title: "Manage Roles",
                                modalBody: <ManageRoles />,
                                modalFooter: <><Button autoFocus onClick={() => { unSetModal() }}>Submit</Button></>
                            });
                        }
                    }
                ];

                return (
                    <ContextMenu actions={actions} />
                );
            }
        }
    }];
    return (
        <>
            <PageTitle title={"User Management"} />
            <MUIDataTable data={employees} columns={columns} options={tableOptions} />
        </>

    )
}
function ManageRoles() {
    const [roles, setRoles] = React.useState<any>([]);
    const [selectedRoles, setSelectedRoles] = React.useState<any>([]);
    const { data } = useGetAllRolesQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setRoles(data.roles?.map(role => {
                return {
                    id: role?.id,
                    roleName: role?.roleName
                }
            }))
        }
    });
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        setSelectedRoles(value);

    };
    return <div>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedRoles}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value.id} label={value.roleName} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {roles?.map((role) => (
                    <MenuItem
                        key={role.id}
                        value={role}
                    >
                        {role?.roleName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
}
export default UserManagement;