import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue
} from '@reduxjs/toolkit'

import { enqueueSnackbar } from 'store/notifications'

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.data?.message) {
        api.dispatch(
          enqueueSnackbar({
            key: new Date().getTime() + Math.random(),
            message: action.payload.data.message,
            options: { variant: 'error' }
          })
        )
      } else {
        api.dispatch(
          enqueueSnackbar({
            key: new Date().getTime() + Math.random(),
            message: 'Что-то пошло не так, повторите попытку',
            options: { variant: 'error' }
          })
        )
      }
    }

    return next(action)
  }
