import { Room, Message } from 'models'
import { collaberAPI, providesList } from 'services'

const chatsEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Room', 'Message'] })
  .injectEndpoints({
    endpoints: build => ({
      getMessages: build.query<Message[], string | undefined>({
        query: roomId => ({ url: `rooms/${roomId}/messages` }),
        providesTags: result => providesList(result, 'Message')
      }),
      getRooms: build.query<Room[], void>({
        query: () => ({ url: 'rooms' }),
        providesTags: result => providesList(result, 'Room')
      }),
      createRoom: build.mutation<Room, { userIds: number[] }>({
        query: body => ({ url: 'rooms', method: 'POST', body }),
        invalidatesTags: ['Room']
      })
    })
  })

export const {
  useCreateRoomMutation,
  useGetRoomsQuery,
  useGetMessagesQuery,
  util: chatsEndpointsUtil
} = chatsEndpoints
