import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Category } from 'models'

export const categoriesAPI = createApi({
  reducerPath: 'categoriesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/categories'
  }),
  endpoints: build => ({
    getCategories: build.query<Category[], void>({
      query: () => ({ url: '' })
    })
  })
})

export const { useGetCategoriesQuery } = categoriesAPI
