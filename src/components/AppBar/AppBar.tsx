import React, { FC } from 'react'

import { AppBar as MuiAppBar, Button, Grid, Toolbar } from '@mui/material'
import LoadingBar from 'react-redux-loading-bar'
import { NavLink } from 'react-router-dom'

import { useAppSelector, useAuth } from 'hooks'

const AppBar: FC = () => {
  const userId = useAppSelector(state => state.auth.user.id)
  const { signOut, isAuth } = useAuth()

  return (
    <MuiAppBar>
      <LoadingBar />
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
              <Grid item>
                <Button
                  component={NavLink}
                  to="/responses"
                  variant="text"
                  color="inherit"
                >
                  Отклики
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container columnSpacing={2}>
              <Grid item>
                <Button
                  component={NavLink}
                  to="/collaborations/create"
                  variant="text"
                  color="inherit"
                >
                  Создать коллаборацию
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container columnSpacing={2}>
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
              {isAuth ? (
                <Grid item>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => signOut()}
                  >
                    Выйти
                  </Button>
                </Grid>
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
