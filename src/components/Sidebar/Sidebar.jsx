import React from 'react'
import { NavLink } from 'react-router-dom'
import injectSheet from 'react-jss'

const styles = theme => ({
  container: {
    flex: '1 0',
    backgroundColor: theme.colors.dark,
  },
  header: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: theme.colors.white,
  },
  navlink: {
    margin: '10px 0',
    display: 'block',
    padding: '10px 20px 10px 20px',
    fontSize: '14px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    border: `0 solid ${theme.colors.dark}`,
    borderLeftWidth: '3px',
    backgroundColor: theme.colors.dark,
    color: theme.colors.white,
  },
  navlinkActive: {
    extend: 'navlink',
    color: theme.colors.green,
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.lightDark,
  },
})

const Sidebar = ({ routes, classes }) => (
  <div className={classes.container}>
    <h4 className={classes.header}>
      Regatta Planner
    </h4>
    { routes.map(route => (
      <NavLink
        key={route.menu}
        exact={route.exact}
        to={route.path}
        className={classes.navlink}
        activeClassName={classes.navlinkActive}
      >
        {route.menu}
      </NavLink>
    ))}
  </div>
)

export default injectSheet(styles)(Sidebar)
