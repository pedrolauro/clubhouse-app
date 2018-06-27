import React, { Component } from 'react'
import classNames from 'classnames'

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
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  table: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexFlow: 'column',
    },
  },
  body: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexFlow: 'column',
    },
  },
  bodyRow: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      height: '100%',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      justifyContent: 'space-between',
      padding: '5px 30px 10px 20px',
      position: 'relative',
    },
  },
  sideMenu: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      right: '0',
      padding: '4px 0 !important',
    },
  },
  cell: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flex: '1 0 auto',
      justifyContent: 'flex-end',
      minHeight: '48px',
      boxSizing: 'content-box',
      borderBottom: '0',
      padding: '15px 50px 15px 4px',
      textAlign: 'left',
      flexDirection: 'column',
    },
  },
})

const orderData = ({ data, order, orderBy }) => {
  if (!data || data.length === 0) {
    return []
  }
  if (!order || !orderBy) {
    return data
  }

  return order === 'desc'
    ? [...data].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...data].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
}

class EnhancedTable extends Component {
  state = {
    anchorEl: {},
    order: 'asc',
    orderBy: this.props.initialSort,
  }

  handleClick = row => (event) => {
    const anchorEl = { ...this.state.anchorEl }
    anchorEl[row.$id] = event.currentTarget
    this.setState({ anchorEl })
  }

  handleClose = (row) => {
    const anchorEl = { ...this.state.anchorEl }
    anchorEl[row.$id] = null
    this.setState({ anchorEl })
  }

  handleRequestSort = (property) => {
    const orderBy = property
    let order = 'asc'

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc'
    }

    this.setState({ order, orderBy })
  }

  renderTableCell = ({ row, column }) => {
    const { classes } = this.props
    let value = row[column.id]
    if (column.valueAdapter) {
      value = column.valueAdapter(value)
    }

    return (
      <TableCell
        key={column.id}
        className={classes.cell}
        numeric={column.numeric}
      >
        <Hidden mdUp implementation="css">
          <Typography variant="caption">
            {column.label}
          </Typography>
        </Hidden>
        <Typography variant="body2">
          {value}
        </Typography>
      </TableCell>
    )
  }

  renderActionsMenu = (row) => {
    const { classes, actions } = this.props
    const { anchorEl } = this.state
    return (
      <TableCell className={classNames(classes.cell, classes.sideMenu)}>
        <IconButton
          aria-label="Ações"
          aria-owns={anchorEl[row.$id] ? `menu-item-${row.$id}` : null}
          aria-haspopup="true"
          onClick={this.handleClick(row)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={`menu-item-${row.$id}`}
          anchorEl={anchorEl[row.$id]}
          open={!!anchorEl[row.$id]}
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
  }

  renderHead = () => {
    const { metaData } = this.props
    const { order, orderBy } = this.state
    return (
      <Hidden smDown implementation="js">
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
      </Hidden>
    )
  }

  render() {
    const { classes, data, metaData } = this.props
    const { order, orderBy } = this.state
    const orderedData = orderData({ data, order, orderBy })

    return (
      <Table className={classes.table}>
        {this.renderHead()}
        <TableBody className={classes.body}>
          {orderedData.map(row => (
            <TableRow key={row.$id} className={classes.bodyRow}>
              {metaData.map(column => this.renderTableCell({ row, column }))}
              {this.renderActionsMenu(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EnhancedTable)
