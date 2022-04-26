import { useEffect } from 'react'

import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'hooks'
import { Notification } from 'models'
import { removeSnackbar } from 'store/notifications'

let displayed: Notification['key'][] = []

export const useNotifier = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(
    store => store.notifications.notifications || []
  )

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: string | number) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string | number) => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  useEffect(() => {
    notifications.forEach(({ key, message, options }) => {
      if (displayed.includes(key)) return
      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, myKey) => {
          dispatch(removeSnackbar(myKey))
          removeDisplayed(myKey)
        }
      })
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}
