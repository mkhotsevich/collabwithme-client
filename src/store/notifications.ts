import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Notification } from '../models'

type NotificationsState = {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    removeSnackbar: (state, action: PayloadAction<string | number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== action.payload
      )
    },
  },
})

export const { enqueueSnackbar, removeSnackbar } = notificationsSlice.actions

export default notificationsSlice.reducer
