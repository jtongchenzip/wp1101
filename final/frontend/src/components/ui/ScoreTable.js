import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  makeStyles,
} from '@material-ui/core';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  tableHeadCell: {
    height: '45px',
    minWidth: '20px',
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
  },
  row: {
    height: '60px',
  },
}));

function createJudge(task, description, status, errorMsg = null) {
  return {
    task,
    description,
    status,
    errorMsg,
  };
}

const data = [
  createJudge('TODO 1', 'This is a description from cypress. This is a description from cypress. ', 'Pass'),
  createJudge(
    'TODO 2',
    'This is a description from cypress.',
    'Fail',
    'This is a description from cypress. This is a description from cypress. This is a description from cypress. This is a description from cypress. This is a description from cypress.',
  ),
  createJudge('TODO 3', 'This is a description from cypress.', 'Fail'),
  createJudge('TODO 4', 'This is a description from cypress.', 'Pass'),
  createJudge('TODO 5', 'This is a description from cypress.', 'Pass'),
];

const columns = [
  {
    id: 'task',
    label: 'Task',
    align: 'center',
    minWidth: 50,
    width: 100,
  },
  {
    id: 'description',
    label: 'Description',
    align: 'left',
    minWidth: 400,
    width: 800,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    minWidth: 50,
    width: 100,
  },
];

export default function ScoreTable() {
  const classes = useStyles();

  return (
    <>
      <Paper style={{ width: '100%' }}>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHeadCell}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.name}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.width,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <div className={classes.column}>{column.label}</div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.task} className={classes.row}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: column.width,
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                        justifyContent: 'center',
                        color:
                          column.id === 'status'
                          && ((row[column.id] === 'Pass' && theme.palette.secondary.main)
                            || (row[column.id] === 'Fail' && theme.palette.error.main)),
                      }}
                    >
                      {row[column.id]}
                      {column.id === 'description' && row.errorMsg !== null && (
                        <>
                          <br />
                          <div style={{ color: theme.palette.error.main, marginTop: '5px' }}>{row.errorMsg}</div>
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
