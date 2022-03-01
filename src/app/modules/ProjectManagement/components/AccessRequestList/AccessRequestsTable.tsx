import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EnhancedTableHead } from './EnhancedTableHead';
import Button from '@mui/material/Button';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TableEmptyData from '../../../../components/TableEmptyData/TableEmptyData';

interface Data {
    project: number;
    employee: number;
    manager: number;
    pillar: string;
    startDate: Date;
    endDate: Date;
    status: string;
    actions: JSX.Element;
}

type Order = 'asc' | 'desc';

export const AccessRequestsTable = ({ rows }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('status');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [dense, setDense] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    console.log('emptyRows', emptyRows)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ): void => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string): void => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <EnhancedTableToolbar />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(rows.project);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, rows.project)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.emailId}
                                        </TableCell>
                                        <TableCell align="right">{row.reason}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {rows.length === 0 && (
                            <TableEmptyData />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}



const EnhancedTableToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
            style={{ display: 'flex', flexDirection: 'row-reverse' }}
        >
            <Tooltip title="Filter list">
                <Button variant="outlined" onClick={handleClick('bottom-start')} startIcon={<FilterListIcon />}>
                    Filters
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                style={{ zIndex: '0' }}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <div style={{ padding: '30px', width: '500px' }}>
                                    <Typography variant="h6">Filters</Typography>
                                    <Typography variant="subtitle1" style={{ paddingTop: '10px' }}>Status</Typography>
                                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Active" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Pending" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="In Progress" />
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Cancelled" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Error" />
                                        </FormGroup>
                                    </FormControl>

                                </div>
                                <div style={{ padding: '30px', width: '500px' }}>
                                    <Button variant="contained" onClick={handleClose}>Apply</Button>
                                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleClose}>Cancel</Button>
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Dialog>
        </Toolbar>
    );
};