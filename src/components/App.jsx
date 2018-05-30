import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'

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

import Icon from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'


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
  navlink: {
    
  },
})

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  drawer = (routes, classes) => (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        { routes.map(route => (
          <NavLink
            key={route.icon}
            className={classes.navlink}
            exact={route.exact}
            to={route.path}
          >
            <ListItem button>
              <ListItemIcon>
                {/* <Icon
                  icon={route.icon}
                  size="lg"
                  onClick={this.handleDrawerToggle}
                /> */}
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </NavLink>
        ))}
              
              {/* activeClassName={classes.navlinkActive} */}
        {/* <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Send mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem> */}
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
                key={route.icon}
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
              key={route.icon}
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

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)


// import React from 'react'
// import { Route } from 'react-router-dom'
// import injectSheet from 'react-jss'
// import Header from './Header'
// import Sidebar from './Sidebar'

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     boxSizing: 'border-box',
//     flexDirection: 'column',
//     alignItems: 'stretch',
//     justifyContent: 'stretch',
//   },
//   body: {
//     flex: `0 0 calc(100vh - ${theme.sizes.header})`,
//     boxSizing: 'border-box',
//     display: 'flex',
//     flexDirection: 'row',
//     zIndex: 3,
//   },
//   content: {
//     padding: `${4 * theme.unit.padding}px`,
//     flex: '1 0',
//     backgroundColor: theme.colors.white2,
//     'overflow-y': 'auto',
//     zIndex: 1,
//   },
// })

// const App = ({ routes, classes }) => (
//   <div className={classes.container}>
//     <Header routes={routes} />
//     <div className={classes.body}>
//       <Sidebar routes={routes} />
//       <div className={classes.content}>
//         { routes.map(route => (
//           <Route
//             key={route.icon}
//             path={route.path}
//             exact={route.exact}
//             component={route.bodyComponent}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// )

// export default injectSheet(styles)(App)
