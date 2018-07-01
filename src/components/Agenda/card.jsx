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
  card: {
    position: 'absolute',
    width: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    '&:last-child': {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
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
  smallCardMiddle: {
    flex: '1 0',
  },
  avatars: {
    display: 'flex',
    flexFlow: 'row-reverse',
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  avatar: {
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: '0px 2px 3px 0px rgba(0,0,0,0.3)',
    width: theme.sizes.calendarAvatar,
    height: theme.sizes.calendarAvatar,
  },
  notConfirmed: {
    opacity: '0.35',
    borderColor: `${theme.palette.common.white}`,
  },
})

class AgendaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarsContainerWidth: null,
    }
  }

  componentDidMount() {
    const { chave } = this.props
    const el = document.getElementById(`avatars-container-${chave}`)
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ avatarsContainerWidth: el.offsetWidth })
  }

  calcAvatarSpacing = (avatarsCount) => {
    const { theme } = this.props
    const { avatarsContainerWidth } = this.state
    let spacing = theme.sizes.calendarAvatar * avatarsCount
    spacing -= avatarsContainerWidth
    spacing /= (avatarsCount - 1)
    if (!spacing) {
      spacing = theme.sizes.calendarAvatar
    }
    return Math.ceil(spacing)
  }

  renderAvatar = ({ confirmed, imgAvatar, avatarKey }) => {
    const { classes } = this.props
    const style = { marginRight: `-${this.calcAvatarSpacing(8)}px` }

    const classesAvatar = confirmed ?
      classNames(classes.notConfirmed, classes.avatar) : classes.avatar

    return (
      <Avatar
        key={avatarKey}
        style={style}
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
        avatarKey: id,
        confirmed: qtde++ < 4,
        /* eslint-disable import/no-dynamic-require */
        /* eslint-disable global-require */
        imgAvatar: require(`../../images/${id}.jpg`),
      }))
    )
  }

  renderMiddleSection = (smallCard) => {
    const { classes, chave } = this.props
    const avatarsStyle = { marginRight: `${this.calcAvatarSpacing(8)}px` }

    const middleClassName = classNames(
      classes.middle,
      smallCard ? classes.smallCardMiddle : null,
    )

    return (
      <div
        id={`avatars-container-${chave}`}
        className={middleClassName}
      >
        <div
          className={classes.avatars}
          style={avatarsStyle}
        >
          {this.renderRowers({ classes })}
        </div>
        <Typography variant="caption" color="textSecondary">
          4/8 confirmados
        </Typography>
      </div>
    )
  }

  renderFooterText = () => {
    const { classes } = this.props
    return (
      <div className={classes.footerText}>
        <Typography color="textSecondary" variant="caption">
          Reservado até
        </Typography>
        <Typography variant="body2">
          26/07 - 18:30
        </Typography>
      </div>
    )
  }

  render() {
    const {
      theme,
      classes,
      position,
      duration,
    } = this.props

    const smallCard = duration < 9

    const cardStyle = {
      height: `${theme.sizes.markerStep * duration}px`,
      top: `${theme.sizes.markerStep * position}px`,
    }

    return (
      <Card
        style={cardStyle}
        className={classes.card}
      >
        <CardContent className={classes.content}>
          <div className={classes.header}>
            <Typography color="textSecondary" variant="caption">
              Master D Misto
            </Typography>
            <Typography color="textSecondary" variant="caption">
              06:30 - 60m
            </Typography>
          </div>

          {!smallCard ? this.renderMiddleSection(smallCard) : ''}

          <div className={classes.footer}>
            {!smallCard ? this.renderFooterText() : ''}
            {smallCard ? this.renderMiddleSection(smallCard) : ''}

            <div className={classes.footerIcons}>
              <TimelineIcon className={classes.icon} color="disabled" />
              <DirectionsBoatIcon className={classes.icon} />
            </div>
          </div>

        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AgendaCard)
