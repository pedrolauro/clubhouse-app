import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

import Logo from './icons/Logo'
import * as actions from '../actions'

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
  space: {
    ...theme.mixins.toolbar,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  drawerPaper: {
    width: theme.sizes.drawer,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    overflow: 'auto',
    height: '100vh',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  menu: {
    borderLeft: '5px solid transparent',
  },
  menuActive: {
    borderLeft: `5px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.grey[100],
  },
  logo: {
    fill: theme.palette.primary.main,
    width: `${theme.sizes.logo}px`,
    height: 'auto',
  },
  list: {
    padding: 0,
  },
  snackbarClose: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
  },
})

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false,
  }

  componentDidUpdate = (prevProps) => {
    const { queue: prevQueue } = prevProps.snackbarController
    const { queue } = this.props.snackbarController
    if (queue !== prevQueue) {
      this.props.processSnackbarQueue()
    }
  }

  getMenuClasses = (route, classes) => {
    const { pathname } = this.props.location
    if (pathname === route.path) {
      return classes.menuActive
    }
    return classes.menu
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleRouteChange = (route) => {
    this.props.changeRoute(route)
    this.handleDrawerToggle()
  }

  drawer = (routes, classes) => (
    <div>
      <div className={classes.toolbar}>
        <Logo className={classes.logo} />
        <Typography variant="title" color="primary">
          BoatHouse
        </Typography>
      </div>
      <Divider />
      <List className={classes.list}>
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
    const {
      routes,
      classes,
      theme,
      snackbarController: {
        open: snackbarOpened,
        data: {
          key: snackbarKey,
          message: snackbarMessage,
          anchor: snackbarAnchor,
          duration: snackbarDuration,
        },
      },
    } = this.props

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
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.drawer(routes, classes)}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            {this.drawer(routes, classes)}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.space} />
          { routes.map(route => (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.bodyComponent}
            />
          ))}
        </main>
        <Snackbar
          key={snackbarKey}
          anchorOrigin={snackbarAnchor}
          open={snackbarOpened}
          autoHideDuration={snackbarDuration}
          onClose={this.props.hideSnackbar}
          ContentProps={{
            'aria-describedby': 'snackbar-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-message-id">{snackbarMessage}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Fechar"
              color="inherit"
              className={classes.snackbarClose}
              onClick={this.props.hideSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
          className={classes.snackbar}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ controller }) => ({
  location: controller.router.location,
  snackbarController: controller.snackbar,
})

const ThemedResponsiveDrawer = withStyles(styles, { withTheme: true })(ResponsiveDrawer)
export default connect(mapStateToProps, actions)(ThemedResponsiveDrawer)
