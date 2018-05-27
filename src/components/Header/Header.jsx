import React from 'react'
import { Route } from 'react-router-dom'
import injectSheet from 'react-jss'
import Logo from './../Logo/Logo'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.header}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 4,
    color: theme.colors.lightDark,
    boxShadow: '0 0 25px 7px rgba(0,0,0,.05)',
  },
  logoContainer: {
    flex: `0 0 ${theme.sizes.sidebar}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flex: '1 0',
    paddingLeft: `${4 * theme.unit.padding}px`,
  },
  logo: {
    width: 'auto',
    height: theme.sizes.logo,
    fill: theme.colors.blue,
  },
})

const Header = ({ routes, classes }) => (
  <div className={classes.container}>
    <div className={classes.logoContainer}>
      <Logo className={classes.logo} />
    </div>
    <div className={classes.bar}>
      { routes.map(route => (
        <Route
          key={route.icon}
          path={route.path}
          exact={route.exact}
          component={route.headerComponent}
        />
      ))}
    </div>
  </div>
)

export default injectSheet(styles)(Header)
