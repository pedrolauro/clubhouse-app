export default function qualquer(state = 0, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return state + 1
    default:
      return state
  }
}
