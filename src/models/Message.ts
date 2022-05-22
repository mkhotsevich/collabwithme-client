import { Room, User } from 'models'

export type Message = {
  id: number
  userId: number
  roomId: number
  message: string
  room: Room
  user: User
  createdDate: string
}
