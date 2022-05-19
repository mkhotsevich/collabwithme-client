import { User } from 'models'
import { collaberAPI } from 'services'

type SignUpCredentials = Pick<
  User,
  'email' | 'password' | 'username' | 'firstName' | 'lastName'
>
type SignInCredentials = { email: string; password: string }
type AuthToken = { token: string }

const authEndpoints = collaberAPI.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<AuthToken, SignUpCredentials>({
      query: body => ({
        url: 'auth/sign-up',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation<AuthToken, SignInCredentials>({
      query: body => ({
        url: 'auth/sign-in',
        method: 'POST',
        body
      })
    })
  })
})

export const { useSignUpMutation, useSignInMutation } = authEndpoints
