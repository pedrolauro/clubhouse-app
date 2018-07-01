
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import * as actions from '../../actions'
import { getTimingInterval } from '../../helpers'

import AgendaCard from './card'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px`,
    marginRight: `${theme.spacing.unit * 2}px`,
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
    marginRight: `${theme.spacing.unit * 2}px`,
  },
  timeStep: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: `${theme.sizes.minuteStep}px`,
  },
  marker: {
    marginLeft: `${theme.spacing.unit}px`,
  },
  cards: {
    position: 'relative',
    marginTop: `${theme.spacing.unit}px`,
    flex: '1 0',
  },
})

class Agenda extends Component {
  renderTimings = (timings) => {
    const { classes } = this.props
    return timings.map((timing) => {
      const { key, time } = timing
      return (
        <div key={key} className={classes.timeStep}>
          {!time ? '' : (
            <Typography
              color="textSecondary"
              variant="caption"
            >
              {key}
            </Typography>
          )}
          <Typography
            color="textSecondary"
            variant="caption"
            className={classes.marker}
          >
            -
          </Typography>
        </div>
      )
    })
  }

  render() {
    const {
      classes,
      calendarRestrictions: {
        initialTime,
        endTime,
        timeInterval,
        markerInterval,
      },
    } = this.props

    const timings = getTimingInterval(initialTime, endTime, markerInterval, timeInterval)

    const position1 = 30 / markerInterval
    const duration1 = 60 / markerInterval
    const position2 = 120 / markerInterval
    const duration2 = 30 / markerInterval

    return (
      <div>
        <div className={classes.space} />
        <div className={classes.root}>
          <div className={classes.timings}>
            {this.renderTimings(timings)}
          </div>
          <div className={classes.cards}>
            <AgendaCard
              className={classes.card}
              position={position1}
              duration={duration1}
            />
            <AgendaCard
              className={classes.card}
              position={position2}
              duration={duration2}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  calendarRestrictions: data.immutable.calendarRestrictions,
  snackbarOpen: controller.snackbar.open,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Agenda))
