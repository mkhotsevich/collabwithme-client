import { Category } from 'models'
import { collaberAPI, providesList } from 'services'

const categoriesEndpoints = collaberAPI
  .enhanceEndpoints({ addTagTypes: ['Category'] })
  .injectEndpoints({
    endpoints: build => ({
      getCategories: build.query<Category[], void>({
        query: () => ({ url: 'categories' }),
        providesTags: result => providesList(result, 'Category')
      })
    })
  })

export const { useGetCategoriesQuery } = categoriesEndpoints
