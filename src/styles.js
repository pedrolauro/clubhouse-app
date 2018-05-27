export const theme = {
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
    header: '70px',
    logo: '50px',
    sidebar: '90px',
  },
  unit: {
    padding: 5,
  },
}

export const globalStyles = {
  '@global body': {
    margin: '0',
    padding: '0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '12px',
    color: theme.colors.lightDark,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  '@global h1, h2, h3, h4': {
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
}
