import { Category, Network, User, Response } from 'models'

export type Collaboration = {
  id: number
  name: string
  description: string
  createdDate: Date
  userId: number
  categories: Category[]
  networks: Network[]
  user: User
  responses: Response[]
  networkIds: number[]
  categoryIds: number[]
}
