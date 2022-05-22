import React, { FC } from 'react'

import { AppBar as MuiAppBar, Button, Grid, Toolbar } from '@mui/material'
import LoadingBar from 'react-redux-loading-bar'
import { NavLink } from 'react-router-dom'

import { useAuth } from 'hooks'

const AppBar: FC = () => {
  const { signOut, isAuth } = useAuth()

  return (
    <MuiAppBar>
      <LoadingBar showFastActions />
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid container columnSpacing={2}>
              <Grid item></Grid>
              <Grid item>
                <Button
                  component={NavLink}
                  to="/collaborations"
                  variant="text"
                  color="inherit"
                >
                  Коллаборации
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container columnSpacing={2}>
              {isAuth ? (
                <>
                  <Grid item>
                    <Button
                      component={NavLink}
                      to="/my-collaborations"
                      variant="text"
                      color="inherit"
                    >
                      Мои коллаборации
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={NavLink}
                      to="/my-responses"
                      variant="text"
                      color="inherit"
                    >
                      Мои отклики
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={NavLink}
                      to="/chats"
                      variant="text"
                      color="inherit"
                    >
                      Чат
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={NavLink}
                      to="/profile"
                      variant="text"
                      color="inherit"
                    >
                      Профиль
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => signOut()}
                    >
                      Выйти
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button
                    component={NavLink}
                    to="/sign-in"
                    variant="text"
                    color="inherit"
                  >
                    Войти
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
