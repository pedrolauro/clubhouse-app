import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

// import Hidden from '@material-ui/core/Hidden'

const styles = () => ({
  table: {
  },
})

class EnhancedTable extends Component {
  state = {
    anchorEl: {},
    order: undefined,
    orderBy: undefined,
    data: [...this.props.initialData],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialData !== this.props.initialData) {
      this.setState({ data: [...this.props.initialData] })
    }
  }

  handleClick = row => (event) => {
    const anchorEl = { ...this.state.anchorEl }
    anchorEl[row.id] = event.currentTarget
    this.setState({ anchorEl })
  }

  handleClose = (row) => {
    const anchorEl = { ...this.state.anchorEl }
    anchorEl[row.id] = null
    this.setState({ anchorEl })
  }

  handleRequestSort = (property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  printTableCell = ({ row, column }) => {
    let value = row[column.id]
    if (column.valueAdapter) {
      value = column.valueAdapter(value)
    }

    return (
      <TableCell
        key={column.id}
        numeric={column.numeric}
      >
        {value}
      </TableCell>
    )
  }

  printActionsMenu = ({ anchorEl, actions, row }) => (
    <TableCell>
      <IconButton
        aria-label="Ações"
        aria-owns={anchorEl[row.id] ? `menu-item-${row.id}` : null}
        aria-haspopup="true"
        onClick={this.handleClick(row)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`menu-item-${row.id}`}
        anchorEl={anchorEl[row.id]}
        open={!!anchorEl[row.id]}
        onClose={() => this.handleClose(row)}
      >
        {actions.map(action => (
          <MenuItem
            key={action.id}
            onClick={() => action.onClick(row) || this.handleClose(row)}
          >
            <ListItemIcon>
              {action.icon}
            </ListItemIcon>
            <ListItemText primary={action.label} />
          </MenuItem>
        ), this)}
      </Menu>
    </TableCell>
  )

  render() {
    const { classes, metaData, actions } = this.props
    const {
      data,
      order,
      orderBy,
      anchorEl,
    } = this.state

    console.log(`render, data: ${data.length}`);

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {metaData.map(column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={() => this.handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ))}
            <TableCell padding="default" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              {metaData.map(column => this.printTableCell({ row, column }))}
              {this.printActionsMenu({ anchorEl, actions, row })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(EnhancedTable)
