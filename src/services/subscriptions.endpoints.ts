import { Subscription } from 'models'
import { collaberAPI, providesList } from 'services'

const subscriptionsEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Subscription'] })
  .injectEndpoints({
    endpoints: build => ({
      getSubscriptions: build.query<Subscription[], void>({
        query: () => ({ url: 'subscriptions' }),
        providesTags: result => providesList(result, 'Subscription')
      })
    })
  })

export const { useGetSubscriptionsQuery } = subscriptionsEndpoints
