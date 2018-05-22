import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import teste from './teste'

export default combineReducers({ teste, router: routerReducer })
