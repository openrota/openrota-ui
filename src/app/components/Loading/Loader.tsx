import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export type LoadingProps = {
  bullseyeProps?: Omit<BullseyeProps, 'children'>;
  spinnerProps?: SpinnerProps;
};

export const Loading: React.FunctionComponent<LoadingProps> = ({ bullseyeProps, spinnerProps }: LoadingProps) => (
  <Box sx={{ display: 'flex', mx: 'auto',
  width: 200, textAlign: 'center',}}>
      <CircularProgress />
    </Box>
);
