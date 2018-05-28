import React from 'react'
import { NavLink } from 'react-router-dom'
import injectSheet from 'react-jss'
import Icon from '@fortawesome/react-fontawesome'

const styles = theme => ({
  container: {
    flex: `0 0 ${theme.sizes.sidebar}`,
    backgroundColor: theme.colors.white,
    boxShadow: '0 0 25px 7px rgba(0,0,0,.05)',
    paddingTop: '20px',
    zIndex: 2,
  },
  navlink: {
    position: 'relative',
    margin: '15px 0',
    display: 'block',
    padding: '10px 20px 10px 20px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: theme.colors.white,
    color: theme.colors.lightDark,
  },
  navlinkActive: {
    color: theme.colors.green,
    '&:after': {
      content: '""',
      backgroundColor: theme.colors.green,
      position: 'absolute',
      width: '4px',
      height: '100%',
      left: '0',
      top: '0',
    },
  },
})

const Sidebar = ({ routes, classes }) => (
  <div className={classes.container}>
    { routes.map(route => (
      <NavLink
        key={route.icon}
        exact={route.exact}
        to={route.path}
        className={classes.navlink}
        activeClassName={classes.navlinkActive}
      >
        <Icon icon={route.icon} size="lg" />
      </NavLink>
    ))}
  </div>
)

export default injectSheet(styles)(Sidebar)
