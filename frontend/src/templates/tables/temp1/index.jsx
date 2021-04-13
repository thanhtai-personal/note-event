import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import WithActionRow from './withActionsRow'

const useStyles = makeStyles({
  table: {
  },
  title: {
    marginTop: '1em',
    marginBottom: '2em',
  }
})

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export default function BasicTable(props) {
  const { tableConfig = { }, tableData = rows,
    text = {
      title: 'USER TABLE'
    },
    onEdit = () => {}, onDelete = () => {}
  } = props
  const { cols = columns, editMode } = tableConfig
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Typography className={classes.title} align={'center'}>{text.title}</Typography>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
             {cols.map((col, index) => (
                <TableCell key={`${col.field}-${index}`}>{col.headerName}</TableCell>
             ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            editMode ? (<WithActionRow
              key={`${row.id || row.key}-${rowIndex}`}
              rowData={row}
              cols={cols}
              rowIndex={rowIndex}
              onEdit={onEdit}
              onDelete={onDelete}
            />)
            : (<TableRow key={`${row.id || row.key}-${rowIndex}`}>
              {cols.map((col, index) => (
                <TableCell key={`${row.id || row.key}-${rowIndex}-${col.field}-${index}`}>
                  {col.makeCustomCell
                    && typeof col.makeCustomCell === 'function'
                    ? col.makeCustomCell(row[col.field]) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>)
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
