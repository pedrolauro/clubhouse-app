import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import subscribers from './subscribers'
import barcos from './barcos'

export default combineReducers({
  subscribers,
  barcos,
  router,
})
