import React, { FC } from 'react'

import { AppBar as MuiAppBar, Button, Grid, Toolbar } from '@mui/material'
import LoadingBar from 'react-redux-loading-bar'
import { NavLink } from 'react-router-dom'

import { useAuth } from 'hooks'

const AppBar: FC = () => {
  const { signOut, isAuth } = useAuth()

  return (
    <MuiAppBar>
      <LoadingBar />
      <Toolbar>
        <Grid sx={{ ml: 'auto' }}>
          {isAuth ? (
            <Button variant="text" color="inherit" onClick={() => signOut()}>
              Выйти
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/sign-in"
              variant="text"
              color="inherit"
            >
              Войти
            </Button>
          )}
        </Grid>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
