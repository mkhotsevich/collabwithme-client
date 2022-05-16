import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

export type AuthState = {
  token: string | null
  user: {
    id: number | null
    role: 'USER' | 'MODERATOR' | 'ADMIN' | null
  }
}

const token = localStorage.getItem('token')

const initialState: AuthState = {
  token: token,
  user: token ? jwtDecode<AuthState['user']>(token) : { id: null, role: null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.token = action.payload
        const { id, role } = jwtDecode<AuthState['user']>(action.payload)
        state.user = { id, role }
      } else {
        state.token = null
        state.user = { id: null, role: null }
      }
    }
  }
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
