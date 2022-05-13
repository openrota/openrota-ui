import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@material-ui/core/Link';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

import { useTranslation } from 'react-i18next';
import logo from '@app/images/Logo-Red_Hat-Middleware-A-White-RGB.svg';
import { useAuth } from '@app/context';
import ActionsMenu from './components/ActionsMenu';
import AccountMenu from './components/AccountMenu';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Header: React.FC<{}> = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState('');

  const [selected, setSelected] = React.useState('Home');

  useEffect(() => {
    auth?.getUsername().then((userName) => setUserName(userName));
  }, []);

  const menus = [
    {
      name: 'Home',
      icon: <HomeOutlinedIcon style={{ color: '#000' }} />,
      path: '/',
    },
    {
      name: 'Candidate',
      icon: <PersonPinOutlinedIcon style={{ color: '#000' }} />,
      path: 'resource-management',
    },
    {
      name: 'Projects',
      icon: <AccountTreeOutlinedIcon style={{ color: '#000' }} />,
      path: 'project-management',
    },
    {
      name: 'Calendar',
      icon: <TodayOutlinedIcon style={{ color: '#000' }} />,
      path: 'roaster-management',
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSideBarClick = (menu) => {
    setSelected(menu.name);
    navigate(menu.path);
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
            <LogoImg />
          </Typography>
          <ActionsMenu />
          <AccountMenu userName={userName} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem
              button
              key={index}
              onMouseOver={handleDrawerOpen}
              onMouseOut={handleDrawerClose}
              selected={selected === menu.name}
              onClick={() => handleSideBarClick(menu)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        </List>
        <List style={{ marginTop: `auto` }}>
          <Divider />
          <ListItem
            onMouseOver={handleDrawerOpen}
            onMouseOut={handleDrawerClose}
            button
            component={Link}
            href="https://source.redhat.com/departments/legal/globallegalcompliance/compliance_folder/employee_personal_information_privacy_statement_pdfpdf"
          >
            <ListItemIcon>
              <SecurityOutlinedIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText>Privacy Statement</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

function LogoImg() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }
  return <img src={logo} onClick={handleClick} alt="Brand logo" />;
}
