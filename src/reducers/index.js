import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import teste from './teste'
import components from './components'

export default combineReducers({ teste, components, router: routerReducer })
