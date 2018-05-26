import React from 'react'
import { NavLink } from 'react-router-dom'
import injectSheet from 'react-jss'

const styles = theme => ({
  container: {
    flex: '1 0',
    backgroundColor: theme.colors.white,
    zIndex: 1,
    boxShadow: '0 0 25px 7px rgba(0,0,0,.04)',
    paddingTop: '30px',
  },
  // header: {
  //   textTransform: 'uppercase',
  //   textAlign: 'center',
  //   color: theme.colors.lightDark,
  // },
  navlink: {
    margin: '10px 0',
    display: 'block',
    padding: '10px 20px 10px 20px',
    fontSize: '14px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    border: `0 solid ${theme.colors.white}`,
    borderLeftWidth: '4px',
    backgroundColor: theme.colors.white,
    color: theme.colors.lightDark,
  },
  navlinkActive: {
    extend: 'navlink',
    color: theme.colors.green,
    borderColor: theme.colors.green,
  },
})

const Sidebar = ({ routes, classes }) => (
  <div className={classes.container}>
    {/* <h4 className={classes.header}>
      Regatta Planner
    </h4> */}
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
