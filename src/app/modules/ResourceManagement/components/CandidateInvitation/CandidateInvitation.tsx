import { DynamicFormRenderer } from '@app/components';
import { useCreateInvitationMutation, useGetAllInvitationsLazyQuery, useGetAllRolesQuery } from '@app/models';
import resourceRequestSchema from '@app/modules/ResourceManagement/schema/invite-candidates-form.json';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CandidateInvitationsTable from './CandidateInvitationsTable';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CandidateInvitation: React.FC = () => {
    const [invitations, setInvitations] = useState<any>([]);
    const [role, setrole] = React.useState('');
    const [emailId, setemailId] = React.useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [getAllInvitations] = useGetAllInvitationsLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setInvitations(data?.invitation);
        },
    });
    const [createInvitation] = useCreateInvitationMutation({
        onCompleted: (data) => {
            getAllInvitations();
            enqueueSnackbar("Candidate invitation sent successfully", {
                variant: CHIPTYPE.SUCCESS
            });
            setemailId('');
            setrole('');
        },
    });
    const { data } = useGetAllRolesQuery();

    useEffect(() => {
        getAllInvitations();
    }, [])

    const onSubmit = (values): void => {
        const body = {
            emailId: emailId,
            role: {
                id: role
            }
        };
        createInvitation({ variables: { invitation: body } });

    };

    const handleRoleChange = (event) => {
        setrole(event.target.value);
    }
    const onEmailIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setemailId(event.target.value);
    };

    const onUpdateRow = (rowId, rowObj): void => {
        let rows = [...invitations];
        const index = rows.findIndex((row) => row.id == rowId);
        if (index != -1) {
            rows[index] = rowObj
        }

        setInvitations([...rows]);

    };

    const rolesOptions = data?.roles?.map(s => ({ label: s?.roleName, value: s?.id }));

    const loadRoles = () => (_props, _field, formOptions) => ({ ..._props, options: rolesOptions });

    const actionMapper = {
        loadRoles,
    };

    return (
        <div style={{ marginLeft: '20%', marginRight: '20%' }}>
            <h1>Invite</h1>
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email Id"
                        value={emailId}
                        onChange={onEmailIdChange}
                    />
                </FormControl>

                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Select Role"
                        onChange={handleRoleChange}
                    >
                        {data?.roles?.map((option) => (
                            <MenuItem key={option?.id} value={option?.id}>
                                {option?.roleName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Button variant="contained" size="large" onClick={onSubmit}>Submit</Button>
                </FormControl>

            </div>
            {/* <DynamicFormRenderer schema={resourceRequestSchema} onSubmit={onSubmit} actionMapper={actionMapper} /> */}
            {invitations && invitations.length > 0 && <CandidateInvitationsTable rows={invitations} updateRow={onUpdateRow} />}
        </div>
    );
}

export default CandidateInvitation;
