import { TextField } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark'
    // primary: {
    //   main: ''
    // },
    // background: {
    //   default: '#EEEEEE'
    // }
  },
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: '48px'
    },
    h2: {
      fontWeight: 600,
      fontSize: '32px'
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          paddingBottom: '80px'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'small'
      }
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },

    MuiPaper: {
      defaultProps: {
        elevation: 12
      }
    },
    MuiChip: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px'
          }
        }
      }
    },
    // @ts-ignore
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained'
      }
    }
  }
})

export default theme
