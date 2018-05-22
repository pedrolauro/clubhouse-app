import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css';
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
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="left" className="App_column">
          <SideHeader />
          <Sidebar routes={ROUTES} />
        </div>
        <div id="right" className="App_column">
          <Header />
          <div className="App_content">
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
  }
}
