import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  colors: {
    blue: '#495473',
    dark: '#22272A',
    lightDark: '#757575',
    green: '#4EC992',
    white: '#ffffff',
    white2: '#f6f7fb',
    'blue-light': '#5774B6',
  },
  sizes: {
    drawer: 200,
    logo: 40,
  },
  unit: {
    padding: 5,
  },
})

export const globalStyles = {
  '@global html': {
    overflow: 'hidden',
  },
  '@global body': {
    margin: '0',
    padding: '0',
    // fontFamily: 'Arial, Helvetica, sans-serif',
    // fontSize: '12px',
    // color: theme.colors.lightDark,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  '@global h1, h2, h3, h4': {
    // textTransform: 'uppercase',
    // letterSpacing: '1px',
  },
}
