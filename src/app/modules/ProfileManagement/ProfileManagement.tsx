import React from 'react';
import Box from '@mui/material/Box';
import { CandidateProfile } from '@app/modules/ProfileManagement/components';

const ProfileManagement: React.FC = () => (
  <Box sx={{ display: 'flex' }}>
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <CandidateProfile />
    </div>
  </Box>
);

export default ProfileManagement;
