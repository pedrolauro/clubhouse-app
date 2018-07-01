
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import * as actions from '../../actions'
import { getTimingInterval } from '../../helpers'

import AgendaCard from './card'

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px`,
    display: 'flex',
    height: '100%',
    flexFlow: 'row',
  },
  space: {
    ...theme.mixins.toolbar,
  },
  timings: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
    marginRight: `${theme.spacing.unit}px`,
  },
  markers: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
    marginRight: `${theme.spacing.unit}px`,
  },
  timeStep: {
    marginBottom: `${theme.spacing.unit * 6}px`,
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
  marker: {
    marginBottom: `${theme.spacing.unit}px`,
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
  cards: {
    margin: `${theme.spacing.unit}px`,
    marginTop: `calc(${theme.spacing.unit}px - 1px)`,
    // display: 'flex',
    // height: '100%',
    // flexFlow: 'column',
    flex: '1 0',
  },
  card: {
    marginBottom: `${theme.spacing.unit * 2}px`,
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
})

class Agenda extends Component {
  renderMarkers = (markers) => {
    const { classes } = this.props
    return markers.map(marker => (
      <Typography
        key={marker}
        color="textSecondary"
        variant="caption"
        className={classes.marker}
      >
        -
      </Typography>
    ))
  }

  renderTimings = (timings) => {
    const { classes } = this.props
    return timings.map(time => (
      <Typography
        key={time}
        color="textSecondary"
        variant="caption"
        className={classes.timeStep}
      >
        {time}
      </Typography>
    ))
  }

  render() {
    const {
      classes,
    } = this.props

    const initialTime = '06:00'
    const endTime = '18:00'
    const intervalMinutes = 15
    const intervalMarkers = 5
    const timings = getTimingInterval(initialTime, endTime, intervalMinutes)
    const markers = getTimingInterval(initialTime, endTime, intervalMarkers)

    return (
      <div>
        <div className={classes.space} />
        <div className={classes.root}>
          <div className={classes.timings}>
            {this.renderTimings(timings)}
          </div>
          <div className={classes.markers}>
            {this.renderMarkers(markers)}
          </div>
          <div className={classes.cards}>
            <AgendaCard className={classes.card} />
            <AgendaCard className={classes.card} />
            <AgendaCard className={classes.card} />
            <AgendaCard className={classes.card} />
            <AgendaCard className={classes.card} />
            <AgendaCard className={classes.card} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  data: data.barcos,
  snackbarOpen: controller.snackbar.open,
  deleteDialogController: controller.barcos.deleteDialog,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Agenda))
