import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import subscribers from './subscribers'
import barcos from './barcos'
import snackbar from './snackbar'
import agenda from './agenda'

export default combineReducers({
  router,
  subscribers,
  barcos,
  snackbar,
  agenda,
})
