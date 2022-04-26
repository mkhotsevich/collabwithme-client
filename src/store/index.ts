import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  loadingBarMiddleware,
  loadingBarReducer
} from 'react-redux-loading-bar'

import { rtkQueryErrorHandler } from 'middleware'
import { authAPI } from 'services/auth'

import authReducer from './auth'
import notificationsReducer from './notifications'

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  notifications: notificationsReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(rtkQueryErrorHandler)
      .concat(
        loadingBarMiddleware({
          promiseTypeSuffixes: ['pending', 'fulfilled', 'rejected']
        })
      )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
