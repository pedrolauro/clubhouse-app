import React from 'react'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import TimelineIcon from '@material-ui/icons/Timeline'
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
import PeopleIcon from '@material-ui/icons/People'

import Main from './components/Main'
import Barcos from './components/Barcos'
import BarcosHeader from './components/Barcos/header'
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
        BoatHouse
      </Typography>
    ),
    bodyComponent: () => <Main />,
  },
  {
    name: 'Barcos',
    path: '/barcos',
    icon: <DirectionsBoatIcon />,
    headerComponent: () => <BarcosHeader />,
    bodyComponent: () => <Barcos />,
  },
  {
    name: 'Atletas',
    path: '/atletas',
    icon: <PeopleIcon />,
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
    icon: <TimelineIcon />,
    headerComponent: () => (
      <Typography variant="title" color="inherit" noWrap>
        Categorias
      </Typography>
    ),
    bodyComponent: () => <Categorias />,
  },
]
