import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    }
  }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
