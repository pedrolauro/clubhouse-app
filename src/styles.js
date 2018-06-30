import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#d7ffd9',
      main: '#a5d6a7',
      dark: '#75a478',
      contrastText: '#424242',
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
  // unit: {
  //   padding: 5,
  // },
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
