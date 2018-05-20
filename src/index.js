import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
// import { push } from 'react-router-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import App from './components/App/App'
import reducers from './reducers'
import './index.css'

const history = createHistory()
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(routerMiddleware(history), logger),
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
