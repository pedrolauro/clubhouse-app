import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import injectSheet from 'react-jss'
import Logo from './Logo'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.header}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    zIndex: 4,
    color: theme.colors.lightDark,
    boxShadow: '0 0 25px 7px rgba(0,0,0,.06)',
  },
  logoContainer: {
    flex: `0 0 ${theme.sizes.sidebar}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: '20px',
    // backgroundColor: theme.colors.blue,
  },
  logo: {
    width: 'auto',
    height: theme.sizes.logo,
    fill: theme.colors.blue,
    transform: 'scaleX(-1)',
  },
  bar: {
    flex: '1 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: `${4 * theme.unit.padding}px`,
    color: theme.colors.blue,
  },
})

const Header = ({ routes, classes }) => (
  <div className={classes.container}>
    <div className={classes.logoContainer}>
      <Logo className={classes.logo} />
    </div>
    <div className={classes.bar}>
      <Switch>
        { routes.map(route => (
          <Route
            key={route.icon}
            path={route.path}
            exact={route.exact}
            component={route.headerComponent}
          />
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  </div>
)

export default injectSheet(styles)(Header)
