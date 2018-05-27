export default function setHeader(state = {}, { type }) {
  switch (type) {
    case '@@router/LOCATION_CHANGE':
      return {
        title: '',
      }
    default:
      return state
  }
}
