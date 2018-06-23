const barcosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARCOS':
      return payload

    default:
      return state
  }
}

export default barcosReducer
