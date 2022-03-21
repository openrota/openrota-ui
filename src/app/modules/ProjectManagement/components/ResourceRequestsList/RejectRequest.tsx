import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';
import { useSnackbar } from 'notistack';

export const RejectModalView = ({ resourceRequestId, onReject }) => {
    const [reason, setReason] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReason(event.target.value);
    };
    return (
        <React.Fragment>
            <DialogContent>
                <DialogContentText>
                    Please provide reason for rejection
                </DialogContentText>
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        id="outlined-name"
                        label="Reason"
                        value={reason}
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onReject(resourceRequestId, reason) }}>Reject</Button>
            </DialogActions>
        </React.Fragment>
    );
}