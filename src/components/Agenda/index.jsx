
import React, { Component } from 'react'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TimelineIcon from '@material-ui/icons/Timeline'
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
import Avatar from '@material-ui/core/Avatar'

import { isValueInArray } from '../../helpers'

const styles = theme => ({
  root: {
    // padding: `${theme.spacing.unit * 2}px`,
  },
  card: {
    margin: `${theme.spacing.unit * 2}px`,
  },
  content: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    '&:last-child': {
      padding: `${theme.spacing.unit * 2}px`,
    },
  },
  sm: {
    height: `${theme.spacing.unit * 30}px`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerText: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
  },
  footerIcons: {
    display: 'flex',
  },
  middle: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  avatars: {
    display: 'flex',
    flexFlow: 'row-reverse',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px 0`,
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  avatar: {
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: '0px 2px 3px 0px rgba(0,0,0,0.3)',
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    marginRight: `-${theme.spacing.unit * 2.5}px`,
  },
  notConfirmed: {
    opacity: '0.35',
    borderColor: `${theme.palette.common.white}`,
  },
})

class Agenda extends Component {
  renderAvatar = ({
    classes,
    confirmed,
    imgAvatar,
    key,
  }) => {
    const classesAvatar = confirmed ?
      classNames(classes.notConfirmed, classes.avatar) : classes.avatar
    return (
      <Avatar
        key={key}
        alt="Adelle Charles"
        src={imgAvatar}
        className={classesAvatar}
      />
    )
  }

  renderRowers = ({ classes }) => {
    const ids = []
    for (let i = 0; i < 8; i++) {
      let unique = false
      let idAvatar
      while (!unique) {
        if (idAvatar && !isValueInArray(idAvatar, ids)) {
          unique = true
        } else {
          idAvatar = Math.floor((Math.random() * 12) + 1)
        }
      }
      ids.push(idAvatar)
    }

    let qtde = 0
    return (
      ids.map(id => this.renderAvatar({
        classes,
        confirmed: qtde++ < 4,
        /* eslint-disable import/no-dynamic-require */
        /* eslint-disable global-require */
        imgAvatar: require(`../../images/${id}.jpg`),
        key: id,
      }))
    )
  }

  renderCard = ({ classes }) => (
    <Card className={classNames(classes.card, classes.sm)}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Typography color="textSecondary" variant="caption">
            Master D Misto
          </Typography>
          <Typography color="textSecondary" variant="caption">
            06:30 - 60m
          </Typography>
        </div>

        <div className={classes.middle}>
          <div className={classes.avatars}>
            {this.renderRowers({ classes })}
          </div>
          <Typography variant="subheading" color="textSecondary">
            4/8 confirmados
          </Typography>
        </div>

        <div className={classes.footer}>
          <div className={classes.footerText}>
            <Typography color="textSecondary" variant="caption">
              Reservado até
            </Typography>
            <Typography variant="body2">
              26/07 - 18:30
            </Typography>
          </div>
          <div className={classes.footerIcons}>
            <TimelineIcon className={classes.icon} color="disabled" />
            <DirectionsBoatIcon className={classes.icon} />
          </div>
        </div>

      </CardContent>
    </Card>
  )

  render() {
    const {
      classes,
    } = this.props

    return (
      <div className={classes.root}>
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
        {this.renderCard({ classes })}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Agenda)
