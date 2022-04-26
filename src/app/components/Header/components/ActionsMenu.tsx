import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ButtonStyles = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#fff',
    marginRight: theme.spacing(1)
}));

const ActionsMenu = () => {
    const Navigate = useNavigate();
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
        Navigate('view-resource-requests');
    };

    const handleViewAccessRequest = (): void => {
        handleActionClose();
        Navigate('view-access-requests');
    };

    const handleCreateRequest = (): void => {
        handleActionClose();
        Navigate('create-resource-request');
    };

    const handleAddCandidates = (): void => {
        handleActionClose();
        Navigate('add-candidate');
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
                <MenuItem onClick={handleAddCandidates}>Candidate Invitations</MenuItem>
            </Menu>
        </div>
    )

}

export default ActionsMenu;