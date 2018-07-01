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
import jss from 'jss'
import preset from 'jss-preset-default'

// material ui
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

// material ui picker
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import App from './components/App'
import routes from './routes'
import reducers from './reducers'
import { theme, globalStyles } from './styles'

jss.setup(preset())
jss.createStyleSheet(globalStyles).attach()

const history = createHistory()
const middleware = [routerMiddleware(history), thunk]
if (process.env.NODE_ENV !== 'production') {
  // remove logger on production
  middleware.push(logger)
}
const store = createStore(reducers, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App routes={routes} />
          </MuiPickersUtilsProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
