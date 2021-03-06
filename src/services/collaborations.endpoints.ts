import { Collaboration } from 'models'
import { collaberAPI, providesList } from 'services'

type CreateCollaboration = Pick<
  Collaboration,
  'name' | 'description' | 'networkIds' | 'categoryIds'
>

type UpdateCollaborationDto = Pick<
  Collaboration,
  'name' | 'description' | 'networkIds' | 'categoryIds' | 'id'
>

const collaborationsAPI = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Collaboration'] })
  .injectEndpoints({
    endpoints: (build) => ({
      createCollaboration: build.mutation<Collaboration, CreateCollaboration>({
        query: (body) => ({ url: 'collaborations', method: 'POST', body }),
        invalidatesTags: ['Collaboration'],
      }),
      getCollaborations: build.query<Collaboration[], void>({
        query: () => ({ url: 'collaborations' }),
        providesTags: (result) => providesList(result, 'Collaboration'),
      }),
      getCollaborationByUserId: build.query<
        Collaboration[],
        string | number | null
      >({
        query: (id) => ({ url: `collaborations/users/${id}` }),
        providesTags: (result) => providesList(result, 'Collaboration'),
      }),
      getCollaborationById: build.query<
        Collaboration,
        string | number | undefined
      >({
        query: (id) => ({ url: `collaborations/${id}` }),
        providesTags: (result) => [{ type: 'Collaboration', id: result?.id }],
      }),
      updateCollaboration: build.mutation<
        Collaboration,
        UpdateCollaborationDto
      >({
        query: ({ id, ...body }) => ({
          url: `collaborations/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Collaboration'],
      }),
      deleteCollaboration: build.mutation<void, string | number>({
        query: (id) => ({ url: `collaborations/${id}`, method: 'DELETE' }),
        invalidatesTags: ['Collaboration'],
      }),
    }),
  })

export const {
  useCreateCollaborationMutation,
  useGetCollaborationsQuery,
  useGetCollaborationByUserIdQuery,
  useGetCollaborationByIdQuery,
  useUpdateCollaborationMutation,
  useDeleteCollaborationMutation,
} = collaborationsAPI
