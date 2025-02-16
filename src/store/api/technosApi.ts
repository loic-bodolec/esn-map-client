import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { NewTechno, Techno, UpdatedTechno } from '../../types/Techno';

export const technosApi = createApi({
  reducerPath: 'technosApi',
  baseQuery: baseQuery,
  tagTypes: ['Techno'],
  endpoints: (builder) => ({
    fetchTechnos: builder.query<Techno[], void>({
      query: () => '/technos',
      transformResponse: (response: Techno[]) => response ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Techno' as const, id })),
              { type: 'Techno', id: 'LIST' },
            ]
          : [{ type: 'Techno', id: 'LIST' }],
    }),

    fetchTechnoById: builder.query<Techno, number>({
      query: (technoId) => `/technos/techno/${technoId}`,
      providesTags: (_result, _error, id) => [{ type: 'Techno', id }],
    }),

    createTechno: builder.mutation<Techno, NewTechno>({
      query: (techno) => ({
        url: '/technos/techno',
        method: 'POST',
        body: techno,
      }),
      invalidatesTags: [{ type: 'Techno', id: 'LIST' }],
    }),

    updateTechno: builder.mutation<Techno, UpdatedTechno>({
      query: (techno) => ({
        url: `/technos/techno/${techno.id}`,
        method: 'PUT',
        body: techno,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Techno', id },
        { type: 'Techno', id: 'LIST' },
      ],
    }),

    deleteTechno: builder.mutation<void, number>({
      query: (technoId) => ({
        url: `/technos/techno/${technoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Techno', id },
        { type: 'Techno', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useFetchTechnosQuery,
  useFetchTechnoByIdQuery,
  useCreateTechnoMutation,
  useUpdateTechnoMutation,
  useDeleteTechnoMutation,
} = technosApi;
