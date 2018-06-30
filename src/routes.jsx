import React from 'react'
import Typography from '@material-ui/core/Typography'
import TimelineIcon from '@material-ui/icons/Timeline'
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
import PeopleIcon from '@material-ui/icons/People'

import Agenda from './components/Agenda'
import AgendaHeader from './components/Agenda/header'
import Barcos from './components/Barcos'
import BarcosHeader from './components/Barcos/header'
import Atletas from './components/Atletas'
import Categorias from './components/Categorias'
import CalendarIcon from './components/icons/Calendar'


export default [
  {
    name: 'Agenda',
    path: '/',
    exact: true,
    icon: <CalendarIcon />,
    headerComponent: () => <AgendaHeader />,
    bodyComponent: () => <Agenda />,
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
