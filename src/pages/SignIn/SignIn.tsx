import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { Form, Input } from 'components'
import { useAuth } from 'hooks'
import { useSignInMutation } from 'services/auth'

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
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Input
            control={control}
            name="email"
            label="Email"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Input
            control={control}
            name="password"
            type="password"
            label="Пароль"
            required
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Grid
            sx={{ mt: 4 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Button type="submit">Войти</Button>
            <Button component={NavLink} to="/sign-up" variant="text">
              Создать аккаунт
            </Button>
          </Grid>
        </Form>
      </Paper>
    </Grid>
  )
}

export default SignIn
