const barcosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'GET_BARCOS_RESPONSE':
      // The return object is a copy of state and overwrites
      // the state.barcos with a fresh clone of action.barcos
      return [...payload.barcos]

    default:
      return state
  }
}

// TODO: manipular lista de barcos reduzindo actions de add e delete

export default barcosReducer
