import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

// jss
// import { ThemeProvider } from 'react-jss'
import jss from 'jss'
import preset from 'jss-preset-default'

// fontawesome
// import fontawesome from '@fortawesome/fontawesome'
// import { faShip, faUsers, faCalendar, faHome, faSort } from '@fortawesome/fontawesome-free-solid'

// material ui
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './components/App'
import routes from './routes'
import reducers from './reducers'
import { theme, globalStyles } from './styles'


jss.setup(preset())
jss.createStyleSheet(globalStyles).attach()
// fontawesome.library.add(faShip, faUsers, faCalendar, faHome, faSort)

// TODO: remove logger on production
// if (process.env.NODE_ENV !== 'production') {
// }
const history = createHistory()
const store = createStore(reducers, applyMiddleware(routerMiddleware(history), thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App routes={routes} />
        </CssBaseline>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
