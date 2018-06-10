import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
// import Hidden from '@material-ui/core/Hidden'

const styles = () => ({
  root: {
    width: '100%',
  },
  table: {
  },
})

class EnhancedTable extends Component {
  constructor(props) {
    super(props)

    const { initialData: data } = props

    this.state = {
      order: undefined,
      orderBy: undefined,
      data,
    }
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

  printTableCell = (row, column) => {
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

  render() {
    const { classes, metaData } = this.props
    const { data, order, orderBy } = this.state

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              {metaData.map((column, index) => this.printTableCell(row, column, index))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(EnhancedTable)
