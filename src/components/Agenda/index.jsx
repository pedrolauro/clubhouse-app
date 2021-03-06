
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import DatePicker from 'material-ui-pickers/DatePicker'

import * as actions from '../../actions'
import { getTimingInterval } from '../../helpers'

import AgendaCard from './card'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit}px`,
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
    height: `${theme.sizes.markerStep}px`,
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
  handleDateChange = (date) => {
    this.props.filterDateAgenda(date)
  }

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
      dateSelected,
      snackbarOpen,
      calendarConfigurations: {
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
        {/* <div className={classes.space} /> */}
        <DatePicker
          autoOk
          disableOpenOnEnter
          showTodayButton
          allowKeyboardControl={false}
          format="ddd [-] DD/MM/YYYY"
          cancelLabel="Cancelar"
          todayLabel="Hoje"
          minDateMessage="Essa data não está mais disponível para visualização"
          maxDateMessage="Essa data ainda não foi aberta para reservas"
          minDate="2018-06-25"
          maxDate="2018-07-10"
          shouldDisableDate={() => Math.random() <= 0.5}
          leftArrowIcon={(<KeyboardArrowLeftIcon />)}
          rightArrowIcon={(<KeyboardArrowRightIcon />)}
          value={dateSelected}
          onChange={this.handleDateChange}
        />
        <div className={classes.root}>
          <div className={classes.timings}>
            {this.renderTimings(timings)}
          </div>
          <div className={classes.cards}>
            <AgendaCard
              chave="1"
              className={classes.card}
              position={position1}
              duration={duration1}
            />
            <AgendaCard
              chave="2"
              className={classes.card}
              position={position2}
              duration={duration2}
            />
            <AgendaCard
              chave="3"
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
  calendarConfigurations: data.immutable.calendarConfigurations,
  snackbarOpen: controller.snackbar.open,
  dateSelected: controller.agenda.dateSelected,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Agenda))
