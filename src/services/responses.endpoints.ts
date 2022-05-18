import { Response } from 'models'
import { collaberAPI, providesList } from 'services'

const responsesEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Collaboration', 'Response'] })
  .injectEndpoints({
    endpoints: build => ({
      createResponse: build.mutation<
        Response,
        Pick<Response, 'collaborationId' | 'explanation'>
      >({
        query: body => ({ url: 'responses', method: 'POST', body }),
        invalidatesTags: ['Collaboration', 'Response']
      }),
      getResponses: build.mutation<Response[], void>({
        query: () => ({ url: 'responses' })
      }),
      changeStatus: build.mutation<
        void,
        { status: Response['status']; id: number | string }
      >({
        query: ({ id, ...body }) => ({
          url: `responses/${id}`,
          method: 'PATCH',
          body
        }),
        invalidatesTags: ['Collaboration']
      }),
      getResponsesByUserId: build.query<Response[], void>({
        query: id => ({ url: `responses/user` }),
        providesTags: result => providesList(result, 'Response')
      })
    })
  })

export const {
  useCreateResponseMutation,
  useGetResponsesMutation,
  useChangeStatusMutation,
  useGetResponsesByUserIdQuery
} = responsesEndpoints
