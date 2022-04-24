import React from 'react';
import Paper from '@mui/material/Paper';
import { SharedResourceList } from '@app/modules/ResourceManagement/components';
import PageTitle from '@app/components/PageTitle/PageTitle';

const ResourceManagement: React.FC = () => (
  <>  
    <PageTitle title={"Candidates"} />
    <Paper elevation={0} >
      <SharedResourceList />
    </Paper>
  </>
);

export default ResourceManagement;
