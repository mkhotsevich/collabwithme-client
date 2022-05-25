import React, { FC, useCallback, useState } from 'react'

import { Card, CardContent, Grid, TextField, Typography } from '@mui/material'

import { User } from 'models'
import { useGetInfoQuery } from 'services/admin.endpoints'
import { useGetRolesQuery } from 'services/roles.endpoints'
import { useGetSubscriptionsQuery } from 'services/subscriptions.endpoints'
import { useGetUsersQuery } from 'services/users.endpoints'

import UserCard from './UserCard'

const Admin: FC = () => {
  const [search, setSearch] = useState('')
  const { data: info } = useGetInfoQuery()
  const { data: users } = useGetUsersQuery()
  const { data: roles } = useGetRolesQuery()
  const { data: subscriptions } = useGetSubscriptionsQuery()

  const filterUsers = useCallback(
    (user: User) => {
      return (
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      )
    },
    [search]
  )

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid item>
        <Typography variant="h1">Общая информация</Typography>
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Grid container direction="column" rowGap={1}>
                  <Grid item>
                    <Typography>
                      Количество коллабораций: {info?.amountCollaboration}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Количество откликов: {info?.amountResponses}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column" rowGap={1}>
                  <Grid item>
                    <Typography>
                      Количество пользователей: {info?.amountUsers}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Количество сообщений: {info?.amountMessages}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Typography variant="h1">Пользователи</Typography>
      </Grid>

      <Grid item>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Поиск"
        />
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          {users?.filter(filterUsers).map((user) => (
            <Grid item key={user.id}>
              <UserCard
                user={user}
                roles={roles || []}
                subscriptions={subscriptions || []}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Admin
