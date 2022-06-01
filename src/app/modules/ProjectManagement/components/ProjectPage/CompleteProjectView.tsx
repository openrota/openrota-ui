import { useGetAllSharedResourceQuery } from '@app/models';
import { Button, DialogActions, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import TextField from '@mui/material/TextField';

export const CompleteProjectView = ({ projectId, onApprove }) => {
  const [comments, setcomments] = React.useState<string | null>();

  const { data: sharedResourcesList, loading: loadingSharedResourceList } = useGetAllSharedResourceQuery();

  const onAddComments = (event) => {
    setcomments(event.target.value);
  };
  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText>Create feedback for the completed project</DialogContentText>
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
            <TextField
              id="filled-textarea"
              label="Comments"
              //   placeholder="Start typing"
              multiline
              variant="filled"
              onChange={onAddComments}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onApprove(projectId, comments);
          }}
        >
          Complete
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
