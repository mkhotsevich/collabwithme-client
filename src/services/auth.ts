import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type SignUpCredentials = { email: string; password: string }
type SignInCredentials = { email: string; password: string }
type AuthToken = { token: string }

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/auth'
  }),
  endpoints: build => ({
    signUp: build.mutation<AuthToken, SignUpCredentials>({
      query: credentials => ({
        url: '/sign-up',
        method: 'POST',
        body: credentials
      })
    }),
    signIn: build.mutation<AuthToken, SignInCredentials>({
      query: credentials => ({
        url: '/sign-in',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useSignUpMutation, useSignInMutation } = authAPI
