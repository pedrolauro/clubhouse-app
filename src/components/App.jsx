import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// import Icon from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: theme.sizes.drawer,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.sizes.drawer}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.sizes.drawer,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  menu: {
    borderLeft: '5px solid transparent',
  },
  menuActive: {
    borderLeft: `5px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.grey[100],
  },
})

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false,
  }

  getMenuClasses = (route, classes) => {
    const { location } = this.props
    if (location.pathname === route.path) {
      return classes.menuActive
    }
    return classes.menu
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleRouteChange = (route) => {
    const { dispatch } = this.props
    dispatch(push(route.path))
    this.handleDrawerToggle()
  }

  drawer = (routes, classes) => (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        { routes.map(route => (
          <ListItem
            button
            key={route.name}
            className={this.getMenuClasses(route, classes)}
            onClick={() => this.handleRouteChange(route)}
          >
            <ListItemIcon>
              {route.icon}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  render() {
    const { routes, classes, theme } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            { routes.map(route => (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                component={route.headerComponent}
              />
            ))}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.drawer(routes, classes)}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {this.drawer(routes, classes)}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { routes.map(route => (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.bodyComponent}
            />
          ))}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ controller }) => {
  const { location } = controller.router
  return { location }
}

const ThemedResponsiveDrawer = withStyles(styles, { withTheme: true })(ResponsiveDrawer)
export default connect(mapStateToProps)(ThemedResponsiveDrawer)
