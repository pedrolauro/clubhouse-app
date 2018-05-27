export const theme = {
  colors: {
    blue: '#374366',
    dark: '#22272A',
    lightDark: '#757575',
    green: '#0CD19C',
    white: '#ffffff',
    white2: '#f6f7fb',
    'blue-light': '#5774B6',
  },
  sizes: {
    header: '70px',
    logo: '40px',
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
    fontFamily: 'sans-serif',
    fontSize: '14px',
    color: theme.colors.lightDark,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
}
