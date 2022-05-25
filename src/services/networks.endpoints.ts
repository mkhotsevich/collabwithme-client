import { Network } from 'models'
import { collaberAPI, providesList } from 'services'

const networksEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Network'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getNetworks: build.query<Network[], void>({
        query: () => ({ url: 'networks' }),
        providesTags: (result) => providesList(result, 'Network'),
      }),
    }),
  })

export const { useGetNetworksQuery } = networksEndpoints
