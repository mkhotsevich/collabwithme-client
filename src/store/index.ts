import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from 'react-redux-loading-bar'

import { rtkQueryErrorHandler } from 'middleware'
import { collaberAPI } from 'services'

import authReducer from './auth'
import notificationsReducer from './notifications'

const rootReducer = combineReducers({
  [collaberAPI.reducerPath]: collaberAPI.reducer,
  notifications: notificationsReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(collaberAPI.middleware)
      .concat(rtkQueryErrorHandler)
      .concat(
        loadingBarMiddleware({
          promiseTypeSuffixes: ['pending', 'fulfilled', 'rejected'],
        })
      ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
