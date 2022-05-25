import React, { FC, useEffect } from 'react'

import { Chip, Grid, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { useGetUserQuery } from 'services/users.endpoints'

const User: FC = () => {
  const navigate = useNavigate()
  const userId = useAppSelector((state) => state.auth.user.id)
  const { id } = useParams<{ id: string }>()
  const { data: user } = useGetUserQuery(id)

  useEffect(() => {
    if (userId?.toString() === id) {
      navigate('/profile')
    }
  }, [userId, id, navigate])

  if (!user) {
    return null
  }

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid item>
        <Typography variant="h1">{user?.username}</Typography>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Имя:</Typography>
          </Grid>

          <Grid item>
            <Typography>{user?.firstName}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Фамилия:</Typography>
          </Grid>

          <Grid item>
            <Typography>{user?.lastName}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Email:</Typography>
          </Grid>

          <Grid item>
            <Typography>{user?.email}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Пол:</Typography>
          </Grid>

          <Grid item>
            <Typography>{user?.gender}</Typography>
          </Grid>
        </Grid>
      </Grid>

      {user?.links.length && (
        <Grid item>
          <Grid container direction="column" rowGap={1}>
            <Grid item>
              <Typography variant="h6">Социальные сети:</Typography>
            </Grid>

            <Grid item>
              <Grid container columnGap={1}>
                {user?.links?.map((link) => (
                  <Grid item key={link.id}>
                    <Chip
                      size="medium"
                      label={link.network.name}
                      onClick={() => window.open(link.link, '_blank')}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default User
