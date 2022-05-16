import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from 'models'

type SignUpCredentials = Pick<
  User,
  'email' | 'password' | 'username' | 'firstName' | 'lastName'
>
type SignInCredentials = { email: string; password: string }
type AuthToken = { token: string }

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/auth'
  }),
  endpoints: build => ({
    signUp: build.mutation<AuthToken, SignUpCredentials>({
      query: body => ({
        url: '/sign-up',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation<AuthToken, SignInCredentials>({
      query: body => ({
        url: '/sign-in',
        method: 'POST',
        body
      })
    })
  })
})

export const { useSignUpMutation, useSignInMutation } = authAPI
