import { Button, DialogActions, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { Dayjs } from 'dayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const ExtendProjectView = ({ projectId, onSubmitExtendProject }) => {
  const [extendedDate, setextendedDate] = React.useState<Dayjs | null>(null);
  const [reasonForExtension, setreasonForExtension] = React.useState<string | null>('');

  return (
    <React.Fragment>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            width: 500,
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            m: 'auto',
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 400 }}>
            {/* <InputLabel>Candidate</InputLabel> */}
            <DialogContentText>Enter the extended date</DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="MM/dd/yyyy"
                value={extendedDate}
                onChange={(newextendedDate) => {
                  setextendedDate(newextendedDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <DialogContentText>Enter the reason for extension</DialogContentText>
            <TextField
              required
              sx={{ mt: 'auto' }}
              id="filled-textarea"
              label="Reason for Extension"
              multiline
              variant="filled"
              value={reasonForExtension}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setreasonForExtension(event.target.value)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          onClick={() => {
            onSubmitExtendProject(projectId, extendedDate, reasonForExtension);
          }}
        >
          Request Extension
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
