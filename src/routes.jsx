import React from 'react'
import Main from './components/Main/Main'
import Barcos from './components/Barcos/Barcos'
import Alunos from './components/Alunos/Alunos'
import Categorias from './components/Categorias/Categorias'

export default [
  {
    icon: 'home',
    path: '/',
    exact: true,
    headerComponent: () => <h1>Clubhouse App</h1>,
    bodyComponent: () => <Main />,
  },
  {
    icon: 'ship',
    path: '/barcos',
    exact: true,
    headerComponent: () => <h1>Barcos</h1>,
    bodyComponent: () => <Barcos />,
  },
  {
    icon: 'users',
    path: '/alunos',
    headerComponent: () => <h1>Alunos</h1>,
    bodyComponent: () => <Alunos />,
  },
  {
    icon: 'calendar',
    path: '/categorias',
    headerComponent: () => <h1>Categorias</h1>,
    bodyComponent: () => <Categorias />,
  },
]
