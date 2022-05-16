import { useAppDispatch, useAppSelector } from 'hooks'
import { setToken } from 'store/auth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(store => store.auth.token)

  const signIn = (token: string) => {
    localStorage.setItem('token', token)
    dispatch(setToken(token))
  }

  const signOut = () => {
    localStorage.removeItem('token')
    dispatch(setToken(null))
  }

  return { token, signIn, signOut, isAuth: !!token }
}
