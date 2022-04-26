import { useAppDispatch, useAppSelector } from 'hooks'
import { setCredentials } from 'store/auth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(store => store.auth.token)

  const signIn = (token: string) => {
    localStorage.setItem('token', token)
    dispatch(setCredentials(token))
  }

  const signOut = () => {
    localStorage.removeItem('token')
    dispatch(setCredentials(null))
  }

  return { token, signIn, signOut, isAuth: !!token }
}
