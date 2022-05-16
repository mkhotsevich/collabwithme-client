import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { Form, Input } from 'components'
import { useAuth } from 'hooks'
import { useSignUpMutation } from 'services/auth'

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
  username: yup.string().required('Обязательно')
})

const SignUp: FC = () => {
  const [signUpMutation] = useSignUpMutation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      username: ''
    },
    resolver: yupResolver(signUpSchema)
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
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Typography variant="h6" align="center">
            Создание аккаунта
          </Typography>

          <Input
            control={control}
            name="email"
            label="Email"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <Input
            control={control}
            name="password"
            type="password"
            label="Пароль"
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <Input
            control={control}
            name="passwordConfirmation"
            type="password"
            label="Повторите пароль"
            required
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            margin="normal"
          />

          <Input
            control={control}
            name="username"
            label="Псевдоним"
            required
            error={!!errors.username}
            helperText={errors.username?.message}
            margin="normal"
          />

          <Input
            control={control}
            name="firstName"
            label="Имя"
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            margin="normal"
          />

          <Input
            control={control}
            name="lastName"
            label="Фамилия"
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            margin="normal"
          />

          <Grid
            sx={{ mt: 2 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Button type="submit">Создать</Button>
            <Button component={NavLink} to="/sign-in" variant="text">
              Войти
            </Button>
          </Grid>
        </Form>
      </Paper>
    </Grid>
  )
}

export default SignUp
