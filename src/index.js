import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { ThemeProvider } from 'react-jss'

import App from './components/App/App'
import reducers from './reducers'

const history = createHistory()
const store = createStore(reducers, applyMiddleware(routerMiddleware(history), logger))

const theme = {
  colors: {
    blue: '#374366',
    dark: '#22272A',
    green: '#0CD19C',
    white: '#F5FDFD',
    'blue-light': '#5774B6',
  },
}

// Now you can dispatch navigation actions from anywhere!
// import { push } from 'react-router-redux'
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
