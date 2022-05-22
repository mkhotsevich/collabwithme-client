import { Subscription, Link, Role } from 'models'

export type User = {
  id: number
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  gender: string
  subscription: Subscription
  roleId: number
  subscriptionId: number
  links: Link[]
  role: Role
}
