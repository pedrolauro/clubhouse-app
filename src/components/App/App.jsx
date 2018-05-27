import React from 'react'
import { Route } from 'react-router-dom'
import injectSheet from 'react-jss'
import Header from './../Header/Header'
import Sidebar from './../Sidebar/Sidebar'
import Dashboard from './../Dashboard/Dashboard'
import Alunos from './../Alunos/Alunos'
import Categorias from './../Categorias/Categorias'

const ROUTES = [
  {
    menu: 'Dashboard',
    path: '/',
    exact: true,
    main: () => <Dashboard />,
  },
  {
    menu: 'Alunos',
    path: '/alunos',
    main: () => <Alunos />,
  },
  {
    menu: 'Categorias',
    path: '/categorias',
    main: () => <Categorias />,
  },
]

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

const App = ({ classes }) => (
  <div className={classes.container}>
    <Header />
    <div className={classes.body}>
      <Sidebar routes={ROUTES} />
      <div className={classes.content}>
        { ROUTES.map(route => (
          <Route
            key={route.menu}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </div>
)

export default injectSheet(styles)(App)
