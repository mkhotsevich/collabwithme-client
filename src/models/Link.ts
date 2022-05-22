import { Network } from 'models'

export type Link = {
  id: number
  userId: number
  networkId: number
  link: string
  network: Network
}
