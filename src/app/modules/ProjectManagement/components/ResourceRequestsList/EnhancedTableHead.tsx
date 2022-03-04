import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material';
import React from 'react';
import { visuallyHidden } from '@mui/utils';


type Order = 'asc' | 'desc';
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  interface Data {
    project: string;
    employee: string;
    manager: string;
    pillar: string;
    startDate: Date;
    endDate: Date;
    status: string;
    actions: string;
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

      const headCells: readonly HeadCell[] = [
        {
          id: 'project',
          numeric: false,
          disablePadding: true,
          label: 'Project',
        },
        {
          id: 'employee',
          numeric: true,
          disablePadding: false,
          label: 'Employee',
        },
        {
          id: 'manager',
          numeric: true,
          disablePadding: false,
          label: 'Manager',
        },
        {
          id: 'pillar',
          numeric: true,
          disablePadding: false,
          label: 'Pillar',
        },
        {
          id: 'startDate',
          numeric: true,
          disablePadding: false,
          label: 'Start Date',
        },
        {
          id: 'endDate',
          numeric: true,
          disablePadding: false,
          label: 'End Date',
        },
        {
          id: 'status',
          numeric: true,
          disablePadding: false,
          label: 'Status',
        },
        {
          id: 'actions',
          numeric: true,
          disablePadding: false,
          label: '',
        }
      ];
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }