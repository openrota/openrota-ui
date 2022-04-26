import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

interface IOwnProps {
    title: string;
}

const PageTitle: React.FC<IOwnProps> = ({ title }) => {
    const Navigate = useNavigate();
    function handleClick(event, path) {
        event.preventDefault();
        Navigate(path);
    }
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={(e) => handleClick(e, '/')}>
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            {title}
        </Typography>,
    ];
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, alignSelf: 'flex-end', fontSize: '2.25rem !important' }}
                >
                    {title}
                </Typography>

            </Box>
            <Box sx={{ display: 'flex', marginBottom: '30px', }}>
                { title !== 'Dashboard' && <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>}
            </Box>
        </>
    )
}

export default PageTitle;