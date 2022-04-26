import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper } from '@mui/material'
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
}

const schema = yup.object({
  email: yup.string().email('Некорректный email').required('Введите email'),
  password: yup.string().required('Введите пароль'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароль не совпадают')
})

const SignUp: FC = () => {
  const [signUpMutation] = useSignUpMutation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { email: '', password: '', passwordConfirmation: '' },
    resolver: yupResolver(schema)
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

          <Input
            control={control}
            name="passwordConfirmation"
            type="password"
            label="Повторите пароль"
            required
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
          />

          <Grid
            sx={{ mt: 4 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Button type="submit">Создать аккаунт</Button>
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
