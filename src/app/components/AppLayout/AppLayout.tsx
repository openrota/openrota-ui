import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Page } from '@patternfly/react-core';
import { Header } from '@app/components';
import Box from '@mui/material/Box';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export type AppLayoutProps = {
  children: ReactNode;
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => { 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
