import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { keycloak } from '@app/auth/keycloak';


const AccountMenu = ({userName}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAccount = Boolean(anchorEl);

    const handleMenu = (event): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
        keycloak?.logout();
    };

    const handleMyProfile = (): void => {
        handleClose();
        history.push('/profile-management');
    };


    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
                <Typography  color="inherit" component="div" style={{paddingLeft: '5px'}}>
                    {userName}
                </Typography>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openAccount}
                onClose={handleClose}
            >
                <MenuItem onClick={handleMyProfile}>{t('my_profile')}</MenuItem>
                <MenuItem onClick={handleClose}>{t('user_management')}</MenuItem>
                <MenuItem onClick={handleClose}>{t('logout')}</MenuItem>
            </Menu>
        </div>
    )
}

export default AccountMenu;