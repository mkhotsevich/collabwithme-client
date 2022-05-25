import { Link } from 'models'
import { collaberAPI } from 'services'

type CreateLinkBody = Pick<Link, 'networkId' | 'link'>
type UpdateLinkBody = Pick<Link, 'id' | 'link'>

const linkEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (build) => ({
      createLink: build.mutation<Link, CreateLinkBody>({
        query: (body) => ({
          url: `links`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['User'],
      }),
      deleteLink: build.mutation<Link, number | string>({
        query: (id) => ({ url: `links/${id}`, method: 'DELETE' }),
        invalidatesTags: ['User'],
      }),
      updateLink: build.mutation<Link, UpdateLinkBody>({
        query: ({ id, ...body }) => ({
          url: `links/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['User'],
      }),
    }),
  })

export const {
  useCreateLinkMutation,
  useDeleteLinkMutation,
  useUpdateLinkMutation,
} = linkEndpoints
