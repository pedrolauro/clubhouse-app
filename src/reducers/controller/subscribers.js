const subscribersReducer = (state = {}, { type, payload }) => {
  const pieces = type.split('_')
  const [prefix] = pieces
  if (prefix === 'SUBSCRIBE') {
    return {
      ...state,
      [`${pieces.slice(1).join('_')}_SUBSCRIBER`]: payload,
    }
  } else if (prefix === 'UNSUBSCRIBE') {
    return {
      ...state,
      [`${pieces.slice(1).join('_')}_SUBSCRIBER`]: undefined,
    }
  }
  return state
}

export default subscribersReducer
