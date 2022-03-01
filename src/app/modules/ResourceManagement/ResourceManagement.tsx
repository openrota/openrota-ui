import React from 'react';
import Box from '@mui/material/Box';
import {SharedResourceList } from '@app/modules/ResourceManagement/components';

const ResourceManagement: React.FC = () => (
  <Box sx={{ display: 'flex' }}>
    <SharedResourceList />
  </Box>
);

export default ResourceManagement;
