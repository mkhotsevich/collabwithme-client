import { User, Collaboration } from 'models'

export type Response = {
  id: number
  userId: number
  status: 'sent' | 'accepted' | 'rejected'
  collaborationId: number
  explanation: string
  user: User
  collaboration: Collaboration
}
