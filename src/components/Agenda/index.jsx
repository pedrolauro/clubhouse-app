
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

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
  bottomRest: {
    minHeight: `${theme.spacing.unit * 16}px`,
    [theme.breakpoints.down('sm')]: {
      minHeight: `${theme.spacing.unit * 11}px`,
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  },
  fabMoveUp: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, -46px, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  },
  fabMoveDown: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, 0, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
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
      snackbarOpen,
      calendarRestrictions: {
        initialTime,
        endTime,
        timeInterval,
        markerInterval,
      },
    } = this.props

    const fabClassName = classNames(
      classes.fab,
      snackbarOpen ? classes.fabMoveUp : classes.fabMoveDown,
    )

    const timings = getTimingInterval(initialTime, endTime, markerInterval, timeInterval)

    const position1 = 30 / markerInterval
    const duration1 = 60 / markerInterval
    const position2 = 120 / markerInterval
    const duration2 = 30 / markerInterval
    const position3 = 240 / markerInterval
    const duration3 = 45 / markerInterval

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
            <AgendaCard
              className={classes.card}
              position={position3}
              duration={duration3}
            />
          </div>
        </div>
        <div className={classes.bottomRest} />
        <Button
          variant="fab"
          aria-label="Adicionar"
          color="primary"
          className={fabClassName}
        >
          {/* onClick={() => this.props.openBarcoForm()} */}
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  calendarRestrictions: data.immutable.calendarRestrictions,
  snackbarOpen: controller.snackbar.open,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Agenda))
