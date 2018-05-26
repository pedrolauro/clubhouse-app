import React from 'react'
import injectSheet from 'react-jss'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.header}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.white,
    padding: '10px',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2,
    color: theme.colors.lightDark,
    boxShadow: '0 0 25px 7px rgba(0,0,0,.04)',
  },
})

const Header = ({ classes }) => (
  <div className={classes.container}>
    <h1>Topo</h1>
  </div>
)

export default injectSheet(styles)(Header)
