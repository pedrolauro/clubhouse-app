import React from 'react'

import EnhancedTable from './common/EnhancedTable'


function createData(id, types, weightClass, color, detail, maintenance) {
  return {
    id,
    types,
    weightClass,
    color,
    detail,
    maintenance,
  }
}

const metaData = [
  {
    id: 'types',
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

let id = 1
const data = [
  createData(id++, '4x/4-', 'leve', 'azul', 'china', true),
  createData(id++, '2x/2-', 'leve', 'azul', 'itália', true),
  createData(id++, '2x/2-', 'pesado', 'azul', 'china', false),
  createData(id++, '1x', 'leve', 'amarelo', 'fibra', false),
  createData(id++, '8+', 'pesado', 'marrom', 'madeira', false),
]

export default () => (
  <EnhancedTable metaData={metaData} initialData={data} />
)
