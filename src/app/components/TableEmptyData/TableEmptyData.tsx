import React from 'react';
import Box from '@mui/material/Box';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const TableEmptyData = () => {
    return (
        <TableRow>
            <TableCell colSpan={12} >
                <Box
                    sx={{
                        mx: 'auto',
                        p: 1,
                        m: 1,
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                    }}
                >
                    <TableViewRoundedIcon color="disabled" sx={{ fontSize: 80 }} />
                    <Typography >No data</Typography>
                </Box>
            </TableCell>
        </TableRow>
    )
}

export default TableEmptyData;