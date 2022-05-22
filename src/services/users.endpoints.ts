import { User } from 'models'
import { collaberAPI, providesList } from 'services'

type UpdatePersonalInfoDto = Partial<
  Pick<
    User,
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'gender'
    | 'username'
    | 'roleId'
    | 'subscriptionId'
    | 'id'
  >
>

type UpdatePasswordDo = {
  currentPassword: string
  newPassword: string
}

const usersEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: build => ({
      getUsers: build.query<User[], void>({
        query: () => ({ url: 'users' }),
        providesTags: result => providesList(result, 'User')
      }),
      getUser: build.query<User, string | number | null | undefined>({
        query: id => ({ url: `users/${id}` }),
        providesTags: ['User']
      }),
      updatePersonalInfo: build.mutation<User, UpdatePersonalInfoDto>({
        query: body => ({
          url: `users/me`,
          method: 'PATCH',
          body
        }),
        invalidatesTags: ['User']
      }),
      updateUser: build.mutation<User, UpdatePersonalInfoDto>({
        query: ({ id, ...body }) => ({
          url: `users/${id}`,
          method: 'PATCH',
          body
        }),
        invalidatesTags: ['User']
      }),
      updatePassword: build.mutation<User, UpdatePasswordDo>({
        query: body => ({
          url: `users/password`,
          method: 'PATCH',
          body
        }),
        invalidatesTags: ['User']
      })
    })
  })

export const {
  useGetUserQuery,
  useUpdatePersonalInfoMutation,
  useUpdatePasswordMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} = usersEndpoints
