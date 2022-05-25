import React from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from 'App'
import { store } from 'store'
import theme from 'theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </HashRouter>
)
