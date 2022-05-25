import { Info } from 'models'
import { collaberAPI } from 'services'

const adminEndpoints = collaberAPI.injectEndpoints({
  endpoints: (build) => ({
    getInfo: build.query<Info, void>({
      query: () => ({ url: 'admin/info' }),
    }),
  }),
})

export const { useGetInfoQuery } = adminEndpoints
