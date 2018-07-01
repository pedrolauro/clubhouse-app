const initialState = {
  barcoSelected: { $id: '' },
}

const agendaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILTER_BARCO_AGENDA':
      return {
        ...state,
        barcoSelected: payload,
      }

    case 'FETCH_BARCOS':
      if (state.barcoSelected.$id === ''
        && payload
        && payload.length > 0) {
        return {
          ...state,
          barcoSelected: payload[0],
        }
      }
      return state

    default:
      return state
  }
}

export default agendaReducer
