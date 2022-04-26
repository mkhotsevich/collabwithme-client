import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#EEEEEE'
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'small',
        margin: 'dense'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 24
      }
    }
  }
})

export default theme
