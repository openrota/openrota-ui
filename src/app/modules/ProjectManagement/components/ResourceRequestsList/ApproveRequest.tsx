import React from 'react';
import { useGetAllSharedResourceQuery, useGetResourceRequestByIdQuery } from '@app/models';
import { Button, DialogActions } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const ApproveModalView = ({ resourceRequestId, onApprove }) => {

    const [selectedCandidate, setselectedCandidate] = React.useState<number | null>(1);

    const { data: sharedResourcesList, loading: loadingSharedResourceList } = useGetAllSharedResourceQuery();

    const { data: resourceRequestById } = useGetResourceRequestByIdQuery({ variables: { id: resourceRequestId } });


    const onCandidateSelect = (event: SelectChangeEvent) => {
        setselectedCandidate(parseInt(event.target.value));
    };
    return (
        <React.Fragment>
            <TableContainer>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">Suggested Assignment
                                <Tooltip title="Suggestions are based on an AI algorithm and are just for reference to pick the suitable candidate for the assignment" placement="top">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip></TableCell>
                            <TableCell align="left">{resourceRequestById?.sharedResourceRequestById?.suggestedResource?.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left"> Select an employee to assign to project</TableCell>
                            <TableCell align="left">
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{
                                        width: 300,
                                        maxWidth: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
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
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogActions>
                <Button onClick={() => { onApprove(resourceRequestId, selectedCandidate) }}>Approve</Button>
            </DialogActions>
        </React.Fragment>
    );
}