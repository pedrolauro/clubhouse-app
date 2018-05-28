import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

// jss
import { ThemeProvider } from 'react-jss'
import jss from 'jss'
import preset from 'jss-preset-default'

// fontawesome
import fontawesome from '@fortawesome/fontawesome'
import { faShip, faUsers, faCalendar, faHome, faSort } from '@fortawesome/fontawesome-free-solid'

import App from './components/App'
import routes from './routes'
import reducers from './reducers'
import { theme, globalStyles } from './styles'

jss.setup(preset())
jss.createStyleSheet(globalStyles).attach()
fontawesome.library.add(faShip, faUsers, faCalendar, faHome, faSort)

const history = createHistory()
const store = createStore(reducers, applyMiddleware(routerMiddleware(history), logger))

// Now you can dispatch navigation actions from anywhere!
// import { push } from 'react-router-redux'
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
