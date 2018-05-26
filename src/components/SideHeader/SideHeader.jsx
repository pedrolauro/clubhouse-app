import React from 'react'
import injectSheet from 'react-jss'
import logo from './../../images/logo.svg'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.header}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  '@keyframes SideHeader-logo-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  logo: {
    animation: 'SideHeader-logo-spin infinite 20s linear',
    height: theme.sizes.logo,
  },
})

const SideHeader = ({ classes }) => (
  <div className={classes.container}>
    <img src={logo} className={classes.logo} alt="logo" />
  </div>
)

export default injectSheet(styles)(SideHeader)
