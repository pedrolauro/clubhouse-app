import React from 'react'
import Typography from '@material-ui/core/Typography';
import Main from './components/Main'
import Barcos from './components/Barcos'
import Alunos from './components/Alunos'
import Categorias from './components/Categorias'

export default [
  {
    icon: 'home',
    name: 'Home',
    path: '/',
    exact: true,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Clubhouse App
      </Typography>
    ),
    bodyComponent: () => <Main />,
  },
  {
    icon: 'ship',
    name: 'Barcos',
    path: '/barcos',
    exact: true,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Barcos
      </Typography>
    ),
    bodyComponent: () => <Barcos />,
  },
  {
    icon: 'users',
    name: 'Alunos',
    path: '/alunos',
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Alunos
      </Typography>
    ),
    bodyComponent: () => <Alunos />,
  },
  {
    icon: 'calendar',
    name: 'Categorias',
    path: '/categorias',
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Categorias
      </Typography>
    ),
    bodyComponent: () => <Categorias />,
  },
]
