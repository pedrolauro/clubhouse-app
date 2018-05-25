import React from 'react'
import { Route } from 'react-router-dom'
import injectSheet from 'react-jss'
import Header from './../Header/Header'
import Sidebar from './../Sidebar/Sidebar'
import SideHeader from './../SideHeader/SideHeader'
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

const styles = () => ({
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    padding: '0',
    margin: '0',
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  column: {
    boxSizing: 'border-box',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    extend: 'column',
    flex: '0 0 100px',
  },
  right: {
    extend: 'column',
    flex: '1 0',
  },
  content: {
    padding: '20px',
    flex: '10 0',
    'overflow-y': 'auto',
  },
})

const App = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.left}>
      <SideHeader />
      <Sidebar routes={ROUTES} />
    </div>
    <div className={classes.right}>
      <Header />
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
