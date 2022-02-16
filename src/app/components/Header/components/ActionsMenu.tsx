import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const ButtonStyles =  styled(Button)<ButtonProps>(({ theme }) =>({
    color: '#fff',
    marginRight: theme.spacing(1)
}));

const ActionsMenu = () => {
    const history = useHistory();
    const [anchorActionEl, setAnchorActionEl] = React.useState(null);
    const openAction = Boolean(anchorActionEl);

    const handleActionClick = (event): void => {
        setAnchorActionEl(event.currentTarget);
    };

    const handleActionClose = (): void => {
        setAnchorActionEl(null);
    };

    const handleViewRequest = (): void => {
        handleActionClose();
        history.push('/view-resource-requests');
    };

    const handleViewAccessRequest = (): void => {
        handleActionClose();
        history.push('/view-access-requests');
    };

    const handleCreateRequest = (): void => {
        handleActionClose();
        history.push('/create-resource-request');
    };

    const handleAddCandidates = (): void => {
        handleActionClose();
        history.push('/add-candidate');
    }

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
                <MenuItem onClick={handleViewRequest}>View requests</MenuItem>
                <MenuItem onClick={handleViewAccessRequest}>View access requests</MenuItem>
                <MenuItem onClick={handleCreateRequest}>Create Request</MenuItem>
                <MenuItem onClick={handleAddCandidates}>Add candidates</MenuItem>
            </Menu>
        </div>
    )

}

export default ActionsMenu;