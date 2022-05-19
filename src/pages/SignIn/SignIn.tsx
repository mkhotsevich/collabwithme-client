import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { Form, Input } from 'components'
import { useAuth } from 'hooks'
import { useSignInMutation } from 'services/auth.endpoints'

type FormData = {
  email: string
  password: string
}

const signInSchema: yup.SchemaOf<FormData> = yup.object({
  email: yup.string().required('Введите email'),
  password: yup.string().required('Введите пароль')
})

const SignIn: FC = () => {
  const [signInMutation] = useSignInMutation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema)
  })

  const submitHandler: SubmitHandler<FormData> = async data => {
    const response = await signInMutation(data).unwrap()
    signIn(response.token)
  }

  return (
    <Grid container justifyContent="center" alignItems="center" flexGrow={1}>
      <Paper sx={{ width: '512px', p: 2 }}>
        <Grid container direction="column" rowGap={2}>
          <Grid item>
            <Typography variant="h6">Вход</Typography>
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
            <Grid container columnGap={2}>
              <Grid item>
                <Button onClick={handleSubmit(submitHandler)}>Войти</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to="/sign-up" variant="outlined">
                  Создать аккаунт
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default SignIn
