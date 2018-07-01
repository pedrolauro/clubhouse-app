import { orderData } from '../../helpers'

const barcosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARCOS':
      return orderData({ data: payload, orderBy: 'tipos' })

    default:
      return state
  }
}

export default barcosReducer
