import { Subscription, Link } from 'models'

export type User = {
  id: number
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  gender: string
  subscription: Subscription
  links: Link[]
}
