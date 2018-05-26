import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { ThemeProvider } from 'react-jss'
import jss from 'jss'
import preset from 'jss-preset-default'

import App from './components/App/App'
import reducers from './reducers'
import { theme, globalStyles } from './styles'

jss.setup(preset())
jss.createStyleSheet(globalStyles).attach()

const history = createHistory()
const store = createStore(reducers, applyMiddleware(routerMiddleware(history), logger))

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
