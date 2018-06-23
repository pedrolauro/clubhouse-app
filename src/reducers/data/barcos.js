const barcosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARCOS':
      return payload ? Object.values(payload) : []

    default:
      return state
  }
}

export default barcosReducer
