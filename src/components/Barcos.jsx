import React from 'react'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import HighlightOff from '@material-ui/icons/HighlightOff'

import EnhancedTable from './common/EnhancedTable'


function createData(id, type, weightClass, color, detail, maintenance) {
  return {
    id,
    type,
    weightClass,
    color,
    detail,
    maintenance,
  }
}

const metaData = [
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'weightClass',
    numeric: false,
    disablePadding: false,
    label: 'Peso',
  },
  {
    id: 'color',
    numeric: false,
    disablePadding: false,
    label: 'Cor principal',
  },
  {
    id: 'detail',
    numeric: false,
    disablePadding: false,
    label: 'Detalhe',
  },
  {
    id: 'maintenance',
    numeric: false,
    disablePadding: false,
    label: 'Em manutenção?',
    valueAdapter: value => value ? 'Sim' : 'Não',
  },
]

function editBarco(data) {
  console.log(`edit id ${data.id}, barco ${data.type} ${data.color}`)
}

function deleteBarco(data) {
  console.log(`delete id ${data.id}, barco ${data.type} ${data.color}`)
}

function enableBarco(data) {
  console.log(`enable id ${data.id}, barco ${data.type} ${data.color}`)
}

const actions = [
  {
    id: 'maintenance',
    label: 'Em manutenção?',
    icon: <HighlightOff />,
    onClick: enableBarco,
  },
  {
    id: 'edit',
    label: 'Editar',
    icon: <Edit />,
    onClick: editBarco,
  },
  {
    id: 'delete',
    label: 'Apagar',
    icon: <Delete />,
    onClick: deleteBarco,
  },
]

let id = 1
const data = [
  createData(id++, '4x/4-', 'leve', 'azul', 'china', true),
  createData(id++, '2x/2-', 'leve', 'azul', undefined, true),
  createData(id++, '2x/2-', 'pesado', 'azul', 'china', false),
  createData(id++, '1x', 'leve', 'amarelo', 'fibra', false),
  createData(id++, '8+', 'pesado', 'marrom', 'madeira', false),
]

export default () => (
  <EnhancedTable
    metaData={metaData}
    initialData={data}
    actions={actions}
  />
)
