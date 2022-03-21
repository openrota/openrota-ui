import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function objectToListViewer(row, exclusions) {
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableBody>
                        {row.map((entry: any) => {
                            if (exclusions != undefined && exclusions.includes(entry.key)) {
                                return null;
                            }
                            return (<TableRow
                                key={entry.key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{entry.key + " : "}</TableCell>
                                <TableCell align="left"> <div>{(entry.render != undefined ? entry.render() : entry.value + "")}</div></TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>);
}