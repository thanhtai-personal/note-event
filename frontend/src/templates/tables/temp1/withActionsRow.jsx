import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableRow, TableCell, Grid } from '@material-ui/core'
import {
  BorderColor as BorderColorIcon,
  DeleteSweep as DeleteSweepIcon,
  CheckCircle as CheckCircleIcon
} from '@material-ui/icons'
import Utils from 'root/utils'

const useStyles = makeStyles({
  actionIcon: {
    cursor: 'pointer'
  }
})

const WithActionRow = (props) => {
  const { cols, rowData, rowIndex
    , onEdit = () => { }, onDelete = () => { }
    , submitEdit = () => { }
  } = props
  const [isEdit, setIsEdit] = useState(false)
  const classes = useStyles()

  const handleOpenEditMode = useCallback(() => {
    setIsEdit(true)
    onEdit(rowData)
  }, [setIsEdit, onEdit, rowData])

  const handleSubmitEditMode = useCallback(async () => {
    await submitEdit()
    setIsEdit(false)
  }, [setIsEdit, submitEdit])

  const handleDeleteCell = useCallback(() => {
    onDelete(rowData)
  }, [onDelete, rowData])

  const rowElement = cols.map((col, index) => (
    <TableCell key={`${rowData.id || rowData.key}-${rowIndex}-${col.field}-${index}`}>
      {isEdit && col.isEditable ? (Utils.makeEditableField(col, rowData[col.field])) : rowData[col.field]}
    </TableCell>
  ))

  return (
    <TableRow>
      {rowElement}
      <TableCell key={'action-cell'} style={{ width: '85px' }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {isEdit ? <CheckCircleIcon className={classes.actionIcon} style={{ color: 'green' }} onClick={handleSubmitEditMode} />
              : <BorderColorIcon className={classes.actionIcon} style={{ color: 'gray' }}  onClick={handleOpenEditMode} />}
          </Grid>
          <Grid item xs={6}>
            <DeleteSweepIcon className={classes.actionIcon} style={{ color: 'red' }} onClick={handleDeleteCell} />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default WithActionRow