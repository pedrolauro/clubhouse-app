import React from 'react'
import injectSheet from 'react-jss'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.header}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.blue,
    padding: '10px',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.colors.white,
  },
})

const Header = ({ classes }) => (
  <div className={classes.container}>
    <h1>Topo</h1>
  </div>
)

export default injectSheet(styles)(Header)
