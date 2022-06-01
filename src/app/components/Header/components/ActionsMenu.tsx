import { useAuth } from '@app/context';
import { topLevelMenuResolver } from '@app/utils/rolesHandler';
import Button, { ButtonProps } from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import id from 'date-fns/esm/locale/id/index.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonStyles = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#fff',
    marginRight: theme.spacing(1)
}));

const ActionsMenu = () => {
    const auth = useAuth();
    const Navigate = useNavigate();
    const [allowedRoutes, setAllowedRoutes] = useState<any>([]);
    const [anchorActionEl, setAnchorActionEl] = React.useState(null);
    const openAction = Boolean(anchorActionEl);

    const handleActionClick = (event): void => {
        setAnchorActionEl(event.currentTarget);
    };

    const handleActionClose = (): void => {
        setAnchorActionEl(null);
    };

    useEffect(() => {
        const allowedItems: any = [];

        if (auth?.getRoles() == null || auth?.getRoles()?.length == 0) {
            Object.entries(topLevelMenuResolver).forEach(item => {
                const [key, value] = item;
                if (value.public != undefined && value.public != null && value.public == true) {
                    allowedItems.push(value);
                }
            })
        }


        auth?.getRoles()?.map(r => {
            Object.entries(topLevelMenuResolver).forEach(item => {
                const [key, value] = item;
                if (value.rolesAllowed != undefined) {
                    const allowedRoles = value.rolesAllowed;
                    if (r != undefined && allowedRoles.includes(r)) {
                        allowedItems.push(value);
                    }
                } else if (value.rolesDenied != undefined || value.rolesDenied != null) {
                    if (r != undefined && value.rolesDenied.includes(r) == false) {
                        allowedItems.push(value);
                    }
                }
            })
        });
        setAllowedRoutes(allowedItems)
    }, [auth]);


    return (
        <div>
            <ButtonStyles aria-controls="fade-menu" aria-haspopup="true" onClick={handleActionClick}>
                Requests
            </ButtonStyles>
            <Menu
                id="fade-menu"
                anchorEl={anchorActionEl}
                keepMounted
                open={openAction}
                onClose={handleActionClose}
                TransitionComponent={Fade}
            >
                {allowedRoutes.map(item => <MenuItem key={item.label} onClick={() => { handleActionClose(); Navigate(item.path) }}>{item.label}</MenuItem>)}
            </Menu>
        </div>
    )

}

export default ActionsMenu;