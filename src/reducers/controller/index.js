import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import api from './api'

export default combineReducers({
  api,
  router,
})
