import { Role } from 'models'
import { collaberAPI, providesList } from 'services'

const rolesEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Role'] })
  .injectEndpoints({
    endpoints: build => ({
      getRoles: build.query<Role[], void>({
        query: () => ({ url: 'roles' }),
        providesTags: result => providesList(result, 'Role')
      })
    })
  })

export const { useGetRolesQuery } = rolesEndpoints
