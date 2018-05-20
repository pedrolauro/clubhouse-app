import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css';
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
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">
          <Sidebar routes={ROUTES} />
          <div className="content">
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
