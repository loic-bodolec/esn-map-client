import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { NewWork, UpdatedWork, Work } from '../../types/Work';

export const worksApi = createApi({
  reducerPath: 'worksApi',
  baseQuery: baseQuery,
  tagTypes: ['Work'],
  endpoints: (builder) => ({
    fetchWorks: builder.query<Work[], void>({
      query: () => '/works',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Work' as const, id })),
              { type: 'Work', id: 'LIST' },
            ]
          : [{ type: 'Work', id: 'LIST' }],
    }),
    fetchWorkById: builder.query<Work, number>({
      query: (workId) => `/works/work/${workId}`,
      providesTags: (result, error, id) => [{ type: 'Work', id }],
    }),
    createWork: builder.mutation<Work, NewWork>({
      query: (work) => ({
        url: '/works/work',
        method: 'POST',
        body: work,
      }),
      invalidatesTags: [{ type: 'Work', id: 'LIST' }],
    }),
    updateWork: builder.mutation<Work, UpdatedWork>({
      query: (work) => ({
        url: `/works/work/${work.id}`,
        method: 'PUT',
        body: work,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Work', id }],
    }),
    deleteWork: builder.mutation<void, number>({
      query: (workId) => ({
        url: `/works/work/${workId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Work', id }],
    }),
  }),
});

export const {
  useFetchWorksQuery,
  useFetchWorkByIdQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} = worksApi;
