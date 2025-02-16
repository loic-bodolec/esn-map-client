import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/baseQuery';
import { Consultant, NewConsultant, UpdatedConsultant } from '../types/Consultant';

export const consultantsApi = createApi({
  reducerPath: 'consultantsApi',
  baseQuery: baseQuery,
  tagTypes: ['Consultant'],
  endpoints: (builder) => ({
    fetchConsultants: builder.query<
      Consultant[],
      { technoIds?: number[]; workIds?: number[]; clientIds?: number[] }
    >({
      query: ({ technoIds = [], workIds = [], clientIds = [] }) => {
        const params = new URLSearchParams();
        if (technoIds.length > 0) {
          technoIds.forEach((id) => params.append('technoIds', id.toString()));
        }
        if (workIds.length > 0) {
          workIds.forEach((id) => params.append('workIds', id.toString()));
        }
        if (clientIds.length > 0) {
          clientIds.forEach((id) => params.append('clientIds', id.toString()));
        }
        return { url: '/consultants', params };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Consultant' as const, id })),
              { type: 'Consultant', id: 'LIST' },
            ]
          : [{ type: 'Consultant', id: 'LIST' }],
    }),
    fetchConsultantById: builder.query<Consultant, number>({
      query: (consultantId) => `/consultants/consultant/${consultantId}`,
      providesTags: (result, error, id) => [{ type: 'Consultant', id }],
    }),
    createConsultant: builder.mutation<Consultant, NewConsultant>({
      query: (consultant) => ({
        url: '/consultants/consultant',
        method: 'POST',
        body: consultant,
      }),
      invalidatesTags: [{ type: 'Consultant', id: 'LIST' }],
    }),
    updateConsultant: builder.mutation<Consultant, UpdatedConsultant>({
      query: (consultant) => ({
        url: `/consultants/consultant/${consultant.id}`,
        method: 'PUT',
        body: consultant,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Consultant', id }],
    }),
    deleteConsultant: builder.mutation<void, number>({
      query: (consultantId) => ({
        url: `/consultants/consultant/${consultantId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Consultant', id }],
    }),
  }),
});

export const {
  useFetchConsultantsQuery,
  useFetchConsultantByIdQuery,
  useCreateConsultantMutation,
  useUpdateConsultantMutation,
  useDeleteConsultantMutation,
} = consultantsApi;
