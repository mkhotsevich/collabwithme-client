import { Collaboration } from 'models'
import { collaberAPI, providesList } from 'services'

type CreateCollaboration = Pick<
  Collaboration,
  'name' | 'description' | 'networkIds' | 'categoryIds'
>

const collaborationsAPI = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Collaboration'] })
  .injectEndpoints({
    endpoints: build => ({
      createCollaboration: build.mutation<Collaboration, CreateCollaboration>({
        query: body => ({ url: 'collaborations', method: 'POST', body }),
        invalidatesTags: ['Collaboration']
      }),
      getCollaborations: build.query<Collaboration[], void>({
        query: () => ({ url: 'collaborations' }),
        providesTags: result => providesList(result, 'Collaboration')
      })
    })
  })

export const { useCreateCollaborationMutation, useGetCollaborationsQuery } =
  collaborationsAPI
