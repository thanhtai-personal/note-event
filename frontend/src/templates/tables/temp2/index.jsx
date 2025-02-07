import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Typography } from '@material-ui/core'

const columnsDemo = [
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
];

const rowsDemo = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable(props) {
  const { columns = columnsDemo, rows = rowsDemo
    , style, pageSize = 5, isCheckboxSelection = true
    , text = {
      title: 'USER TABLE'
    }
  } = props
  return (
    <div style={ style || { height: 400, width: '100%' }}>
      <Typography style={{ marginTop: '1em', marginBottom: '2em' }} align={'center'}>{text.title}</Typography>
      <DataGrid rows={rows} columns={columns} pageSize={pageSize} checkboxSelection={isCheckboxSelection} />
    </div>
  );
}
