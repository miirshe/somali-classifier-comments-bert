// store/pagePostsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { FacebookApiResponse } from '../views/client/classify/components/pagePosts/types';
import baseUrl from './baseUrl';

export const pagePostsApi = createApi({
  reducerPath: 'pagePostsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPagePosts: builder.mutation<FacebookApiResponse, { page_id: string; access_token: string }>({
      query: (body) => ({
        url: '/fetch_posts',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['posts']
    }),
    predictComment: builder.mutation<any, { comment: string }>({
      query: (body) => ({
        url: '/predict',
        method: 'POST',
        body: body
      }),
    }),
    predictMultipleComments: builder.mutation<any, { post_id: string; access_token: string }>({
      query: (body) => ({
        url: '/predict_multiple',
        method: 'POST',
        body: body
      }),
    })
  })
});

export const {
  useGetPagePostsMutation,
  usePredictCommentMutation,
  usePredictMultipleCommentsMutation
} = pagePostsApi;
