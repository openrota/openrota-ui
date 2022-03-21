import { useGetAllSharedResourceQuery } from '@app/models';
import { Button, DialogActions, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
export const ApproveModalView = ({ resourceRequestId, onApprove }) => {

    const [selectedCandidate, setselectedCandidate] = React.useState<number | null>(1);

    const { data: sharedResourcesList, loading: loadingSharedResourceList } = useGetAllSharedResourceQuery();

    const onCandidateSelect = (event: SelectChangeEvent) => {
        setselectedCandidate(parseInt(event.target.value));
    };
    return (
        <React.Fragment>
            <DialogContent>
                <DialogContentText>
                    Select candidate to Assign to Project
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        width: 300,
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        m: 'auto'
                    }}
                >
                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        {/* <InputLabel>Candidate</InputLabel> */}
                        <Select
                            autoFocus
                            value={selectedCandidate?.toString()}
                            onChange={onCandidateSelect}
                        >
                            {sharedResourcesList?.sharedResource?.map(sr => <MenuItem key={sr?.id} value={sr?.id}>{sr?.firstName}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onApprove(resourceRequestId, selectedCandidate) }}>Approve</Button>
            </DialogActions>
        </React.Fragment>
    );
}