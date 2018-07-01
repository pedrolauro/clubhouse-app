const initialState = {
  barcoSelected: { $id: '' },
  dateSelected: new Date(),
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

    case 'FILTER_DATE_AGENDA':
      return {
        ...state,
        dateSelected: payload,
      }

    default:
      return state
  }
}

export default agendaReducer
