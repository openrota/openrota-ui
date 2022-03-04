import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SharedResourceList } from '@app/modules/ResourceManagement/components';
import PageTitle from '@app/components/PageTitle/PageTitle';

const ResourceManagement: React.FC = () => (
  <>  
    <PageTitle title={"Candidates"} />
    {/* <Box sx={{ display: 'flex' }}> */}
    <Paper elevation={0} >
      <SharedResourceList />
    </Paper>
    {/* </Box> */}
  </>
);

export default ResourceManagement;
