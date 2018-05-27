import React from 'react'
import { Route } from 'react-router-dom'
import injectSheet from 'react-jss'
import Header from './../Header/Header'
import Sidebar from './../Sidebar/Sidebar'

const styles = theme => ({
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  body: {
    flex: `0 0 calc(100vh - ${theme.sizes.header})`,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 3,
  },
  content: {
    padding: `${4 * theme.unit.padding}px`,
    flex: '1 0',
    backgroundColor: theme.colors.white2,
    'overflow-y': 'auto',
    zIndex: 1,
  },
})

const App = ({ routes, classes }) => (
  <div className={classes.container}>
    <Header routes={routes} />
    <div className={classes.body}>
      <Sidebar routes={routes} />
      <div className={classes.content}>
        { routes.map(route => (
          <Route
            key={route.icon}
            path={route.path}
            exact={route.exact}
            component={route.bodyComponent}
          />
        ))}
      </div>
    </div>
  </div>
)

export default injectSheet(styles)(App)
