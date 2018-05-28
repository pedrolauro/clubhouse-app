import React from 'react'
import { TableRow, TableCell, Button, IconMenu, IconButton, MenuItem } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const formatTableCell = (cell, format) => {
  switch (format && format.type) {
    case 'link':
      return <NavLink style={{ color: 'black' }} to={`${format.url}`}>{ cell }</NavLink>
    case 'button':
      return (
        <Button 
          color="primary"
          label={`${format.text}`}
        />
      )
    case 'date':
      return new Date()
    default:
      return cell
  }
}

const renderRightIconButton = () => (
  <IconButton iconClassName="fa fa-ellipsis-v" />
)

  // {/* <IconMenu iconButtonElement={renderRightIconButton()}>
  //   <MenuItem
  //     primaryText="Edit"
  //     onTouchTap={() => editCb(item)}
  //   />
  //   <MenuItem
  //     primaryText="Delete"
  //     onTouchTap={() => deleteCb(item)}
  //   />
  // </IconMenu> */}
const actionsMenu = (item, editCb, deleteCb) => (
  <IconButton iconClassName="fa fa-ellipsis-v" />
)

const SmartTableRow = ({
  index,
  row,
  tableHeaders,
  onEdit,
  onDelete,
}) => (
  <TableRow key={index}>
    { tableHeaders.map((header, propIndex) => (
      <TableCell key={propIndex}>
        { formatTableCell(row[header.dataAlias], header.format, row) }
      </TableCell>
    )) }
    <TableCell key="actions" style={{ width: '25px' }}>
      { actionsMenu(row, onEdit, onDelete) }
    </TableCell>
  </TableRow>
)

export default SmartTableRow
