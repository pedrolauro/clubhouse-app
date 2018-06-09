import React from 'react'
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home'
import Timeline from '@material-ui/icons/Timeline'
import DirectionsBoat from '@material-ui/icons/DirectionsBoat'
import People from '@material-ui/icons/People'

import Main from './components/Main'
import Barcos from './components/Barcos'
import Atletas from './components/Atletas'
import Categorias from './components/Categorias'

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    icon: <HomeIcon />,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Clubhouse App
      </Typography>
    ),
    bodyComponent: () => <Main />,
  },
  {
    name: 'Barcos',
    path: '/barcos',
    icon: <DirectionsBoat />,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Barcos
      </Typography>
    ),
    bodyComponent: () => <Barcos />,
  },
  {
    name: 'Atletas',
    path: '/atletas',
    icon: <People />,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Atletas
      </Typography>
    ),
    bodyComponent: () => <Atletas />,
  },
  {
    name: 'Categorias',
    path: '/categorias',
    icon: <Timeline />,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Categorias
      </Typography>
    ),
    bodyComponent: () => <Categorias />,
  },
]
