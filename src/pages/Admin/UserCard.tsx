import React, { FC, useEffect } from 'react'

import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Select } from 'components'
import { Role, User, Subscription } from 'models'
import { useUpdateUserMutation } from 'services/users.endpoints'

type FormData = {
  roleId: string
  subscriptionId: string
}

type UserCardProps = {
  user: User
  roles: Role[]
  subscriptions: Subscription[]
}

const UserCard: FC<UserCardProps> = ({ user, roles, subscriptions }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty }
  } = useForm<FormData>({
    defaultValues: { roleId: '', subscriptionId: '' }
  })

  const [updateUser] = useUpdateUserMutation()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    reset({
      roleId: user.role.id.toString(),
      subscriptionId: user.subscription.id.toString()
    })
  }, [reset, user])

  const updateUserHandler: SubmitHandler<FormData> = async data => {
    try {
      await updateUser({
        id: user.id,
        subscriptionId: +data.subscriptionId,
        roleId: +data.roleId
      }).unwrap()
      enqueueSnackbar('Пользователь успешно обновлен', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar('Ошибка при обновлении пользователя', {
        variant: 'error'
      })
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h6">
              {user.username} ({user.email})
            </Typography>
          </Grid>

          <Grid item sx={{ ml: 'auto' }} xs={2}>
            <Select
              control={control}
              name="roleId"
              options={roles}
              label="Роль"
            />
          </Grid>

          <Grid item xs={2}>
            <Select
              label="Подписка"
              control={control}
              name="subscriptionId"
              options={subscriptions}
            />
          </Grid>

          <Grid item>
            <Button
              onClick={handleSubmit(updateUserHandler)}
              disabled={!isDirty}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserCard
