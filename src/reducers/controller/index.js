import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import subscribers from './subscribers'
import barcos from './barcos'
import snackbar from './snackbar'

export default combineReducers({
  router,
  subscribers,
  barcos,
  snackbar,
})
