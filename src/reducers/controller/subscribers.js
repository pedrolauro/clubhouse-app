const subscribersReducer = (state = {}, { type, payload }) => {
  const pieces = type.split('_')
  if (pieces[0] === 'SUBSCRIBE') {
    return {
      ...state,
      [`${pieces.slice(1).join('_')}_SUBSCRIBER`]: payload,
    }
  } else if (pieces[0] === 'UNSUBSCRIBE') {
    return {
      ...state,
      [`${pieces.slice(1).join('_')}_SUBSCRIBER`]: undefined,
    }
  }
  return state
}

export default subscribersReducer
