
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'

// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import Avatar from '@material-ui/core/Avatar'
// import ImageIcon from '@material-ui/icons/Image'

import * as actions from '../../actions'
import { barcoToString, barcoToStringDetails } from '../../helpers'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectIcon: {
    color: theme.palette.primary.contrastText,
  },
  selectText: {
    ...theme.typography.title,
    color: theme.palette.primary.contrastText,
    '&:focus': {
      background: 'unset',
    },
  },
  selectRoot: {
    position: 'relative',
    top: '1px',
  },
  menuItemRoot: {
    height: 'unset',
  },
})

class AgendaHeader extends Component {
  componentDidMount = () => { this.props.subscribeFetchBarcos() }

  componentWillUnmount = () => { this.props.unsubscribeFetchBarcos() }

  handleChange = (event) => {
    const { data } = this.props
    const barcoSelected = data.find(barco => barco.$id === event.target.value)
    this.props.filterBarcoAgenda(barcoSelected)
  }

  renderBarcoSelected = (selected) => {
    const { data } = this.props
    const barcoSelected = data.find(barco => barco.$id === selected)
    return barcoToString(barcoSelected)
  }

  render() {
    const {
      classes,
      theme,
      data,
      barcoSelected,
    } = this.props

    const BarcosMenuProps = {
      PaperProps: {
        style: {
          maxHeight: (theme.spacing.unit * 30),
          width: 250,
        },
      },
    }

    return (
      <div className={classes.root}>
        <Select
          classes={{
            root: classes.selectRoot,
            icon: classes.selectIcon,
            select: classes.selectText,
          }}
          disableUnderline
          value={barcoSelected.$id}
          onChange={this.handleChange}
          renderValue={selected => this.renderBarcoSelected(selected)}
          MenuProps={BarcosMenuProps}
        >
          {data.map(barco => (
            <MenuItem
              key={barco.$id}
              value={barco.$id}
              classes={{
                root: classes.menuItemRoot,
              }}
            >
              <ListItemText
                primary={barcoToString(barco)}
                secondary={barcoToStringDetails(barco)}
              />
            </MenuItem>
          ))}
        </Select>
        {/* <Hidden mdUp>
          <IconButton color="inherit" className={classes.button} aria-label="Ordenar">
            <Sort />
          </IconButton>
        </Hidden> */}
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  data: data.barcos,
  barcoSelected: controller.agenda.barcoSelected,
})

const StyledAgendaHeader = withStyles(styles, { withTheme: true })(AgendaHeader)

export default connect(mapStateToProps, actions)(StyledAgendaHeader)
