import { Network } from 'models'
import { collaberAPI } from 'services'

const networksEndpoints = collaberAPI.injectEndpoints({
  endpoints: build => ({
    getNetworks: build.query<Network[], void>({
      query: () => ({ url: 'networks' })
    })
  })
})

export const { useGetNetworksQuery } = networksEndpoints
