import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue
} from '@reduxjs/toolkit'

import { Notification } from 'models'
import { setToken } from 'store/auth'
import { enqueueSnackbar } from 'store/notifications'

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const notification: Notification = {
        key: new Date().getTime() + Math.random(),
        message: 'Что-то пошло не так, повторите попытку',
        options: { variant: 'error' }
      }
      const message = action?.payload?.data?.message

      if (message) {
        notification.message = message
      }

      if (action.payload.status === 401) {
        api.dispatch(setToken(null))
      }

      api.dispatch(enqueueSnackbar(notification))
    }
    return next(action)
  }
