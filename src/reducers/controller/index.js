import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import subscribers from './subscribers'

export default combineReducers({
  subscribers,
  router,
})
