import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { Expertise, NewExpertise, UpdatedExpertise } from '../../types/Expertise';

export const expertisesApi = createApi({
  reducerPath: 'expertisesApi',
  baseQuery: baseQuery,
  tagTypes: ['Expertise'],
  endpoints: (builder) => ({
    fetchExpertises: builder.query<Expertise[], void>({
      query: () => '/expertises',
      transformResponse: (response: Expertise[]) => response ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Expertise' as const, id })),
              { type: 'Expertise', id: 'LIST' },
            ]
          : [{ type: 'Expertise', id: 'LIST' }],
    }),

    fetchExpertiseById: builder.query<Expertise, number>({
      query: (expertiseId) => `/expertises/expertise/${expertiseId}`,
      providesTags: (_result, _error, id) => [{ type: 'Expertise', id }],
    }),

    createExpertise: builder.mutation<Expertise, NewExpertise>({
      query: (expertise) => ({
        url: '/expertises',
        method: 'POST',
        body: expertise,
      }),
      invalidatesTags: [{ type: 'Expertise', id: 'LIST' }],
    }),

    updateExpertise: builder.mutation<Expertise, UpdatedExpertise>({
      query: (expertise) => ({
        url: `/expertises/expertise/${expertise.id}`,
        method: 'PUT',
        body: expertise,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Expertise', id },
        { type: 'Expertise', id: 'LIST' },
      ],
    }),

    deleteExpertise: builder.mutation<void, number>({
      query: (expertiseId) => ({
        url: `/expertises/expertise/${expertiseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Expertise', id },
        { type: 'Expertise', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useFetchExpertisesQuery,
  useFetchExpertiseByIdQuery,
  useCreateExpertiseMutation,
  useUpdateExpertiseMutation,
  useDeleteExpertiseMutation,
} = expertisesApi;
