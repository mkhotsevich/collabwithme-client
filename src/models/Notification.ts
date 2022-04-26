import { OptionsObject, SnackbarMessage } from 'notistack'

export type Notification = {
  key: string | number
  message: SnackbarMessage
  options: {
    variant: OptionsObject['variant']
  }
}
