const barcosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARCOS':
      return Object.values(payload)

    default:
      return state
  }
}

export default barcosReducer
