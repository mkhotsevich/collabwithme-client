import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { Input } from 'components'
import { useAuth } from 'hooks'
import { useSignUpMutation } from 'services/auth.endpoints'

type FormData = {
  email: string
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
  username: string
}

const signUpSchema: yup.SchemaOf<FormData> = yup.object({
  email: yup.string().required('Обязательно'),
  password: yup.string().required('Обязательно'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароль не совпадают')
    .required('Обязательно'),
  firstName: yup.string().required('Обязательно'),
  lastName: yup.string().required('Обязательно'),
  username: yup.string().required('Обязательно'),
})

const SignUp: FC = () => {
  const [signUpMutation] = useSignUpMutation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      username: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  const submitHandler: SubmitHandler<FormData> = async ({
    passwordConfirmation,
    ...data
  }) => {
    const response = await signUpMutation(data).unwrap()
    signIn(response.token)
  }

  return (
    <Grid container justifyContent="center" alignItems="center" flexGrow={1}>
      <Paper sx={{ width: '512px', p: 2 }}>
        <Grid container direction="column" rowGap={2}>
          <Grid item>
            <Typography variant="h6">Создание аккаунта</Typography>
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="email"
              label="Email"
              required
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="password"
              type="password"
              label="Пароль"
              required
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="passwordConfirmation"
              type="password"
              label="Повторите пароль"
              required
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
            />
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="username"
              label="Псевдоним"
              required
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="firstName"
              label="Имя"
              required
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item>
            <Input
              control={control}
              name="lastName"
              label="Фамилия"
              required
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item>
            <Grid container columnGap={2}>
              <Grid item>
                <Button onClick={handleSubmit(submitHandler)}>Создать</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to="/sign-in" variant="outlined">
                  Войти
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default SignUp
