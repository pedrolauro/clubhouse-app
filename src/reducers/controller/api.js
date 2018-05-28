import _ from 'lodash'

const isApiCallFinished = type => _.endsWith(type, '_RESPONSE')

const apiReducer = (state = { apiCallsInProgress: 0 }, action) => {
  if (action.type === 'API_CALL_BEGIN') {
    return {
      ...state,
      apiCallsInProgress: state.apiCallsInProgress + 1,
    }
  } else if (isApiCallFinished(action.type) || action.type === 'API_CALL_ERROR') {
    return {
      ...state,
      apiCallsInProgress: state.apiCallsInProgress - 1,
    }
  }

  return state
}

export default apiReducer
