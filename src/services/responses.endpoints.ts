import { Response } from 'models'
import { collaberAPI } from 'services'

const responsesEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Collaboration'] })
  .injectEndpoints({
    endpoints: build => ({
      createResponse: build.mutation<
        Response,
        Pick<Response, 'collaborationId' | 'explanation'>
      >({
        query: body => ({ url: 'responses', method: 'POST', body }),
        invalidatesTags: ['Collaboration']
      }),
      getResponses: build.mutation<Response[], void>({
        query: () => ({ url: 'responses' })
      })
    })
  })

export const { useCreateResponseMutation, useGetResponsesMutation } =
  responsesEndpoints
