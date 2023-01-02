import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';



const CardComponent = ({title, count, innerStyle}) => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        position: 'relative',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 125,
        width: 350,
        lineHeight: '60px',
        borderRadius: '12px'
    }));

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                }}
            >
                <Item elevation={6} sx={{backgroundImage: `${innerStyle}`}}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Typography variant="h6" gutterBottom component="div" style={{ margin: '15px 15px 0px 0px', fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                            {title}
                        </Typography>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Typography variant="h4" gutterBottom component="div" style={{ margin: '0px 15px 0px 0px', fontSize: '48px', fontWeight: '700', color: '#fff' }}>
                            {count || 0}
                        </Typography>
                    </div>
                </Item>
            </Box>
        </>
    )
}

export default CardComponent;