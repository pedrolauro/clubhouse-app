const tiposBarcos = [
  '1x',
  '2+',
  '2-',
  '2x',
  '4+',
  '4-',
  '4x',
  '8+',
]

const categorias = [
  {
    $id: 'JUNIOR',
    label: 'Junior',
    limitByAge: false,
  },
  {
    $id: 'ASPIRANTE',
    label: 'Aspirante',
    limitByAge: false,
  },
  {
    $id: 'SENIOR',
    label: 'Sênior',
    limitByAge: false,
  },
  {
    $id: 'MASTER_A',
    label: 'Master A',
    limitByAge: true,
    limits: [27, 35],
  },
  {
    $id: 'MASTER_B',
    label: 'Master B',
    limitByAge: true,
    limits: [36, 42],
  },
  {
    $id: 'MASTER_C',
    label: 'Master C',
    limitByAge: true,
    limits: [43, 49],
  },
  {
    $id: 'MASTER_D',
    label: 'Master D',
    limitByAge: true,
    limits: [50, 54],
  },
  {
    $id: 'MASTER_E',
    label: 'Master E',
    limitByAge: true,
    limits: [55, 59],
  },
  {
    $id: 'MASTER_F',
    label: 'Master F',
    limitByAge: true,
    limits: [60, 64],
  },
  {
    $id: 'MASTER_G',
    label: 'Master G',
    limitByAge: true,
    limits: [65, 69],
  },
  {
    $id: 'MASTER_H',
    label: 'Master H',
    limitByAge: true,
    limits: [70, 74],
  },
  {
    $id: 'MASTER_I',
    label: 'Master I',
    limitByAge: true,
    limits: [75, 79],
  },
  {
    $id: 'MASTER_J',
    label: 'Master J',
    limitByAge: true,
    limits: [80, 200],
  },
]

const initialData = {
  tiposBarcos,
  categorias,
}

export default (state = initialData) => state
