import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { Client, NewClient, UpdatedClient } from '../../types/Client';

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    fetchClients: builder.query<Client[], { jobIds?: number[]; expertiseIds?: number[] }>({
      query: ({ jobIds = [], expertiseIds = [] }) => {
        const params = new URLSearchParams();
        jobIds.forEach((id) => params.append('jobIds', id.toString()));
        expertiseIds.forEach((id) => params.append('expertiseIds', id.toString()));

        return { url: `/clients?${params.toString()}` };
      },
      transformResponse: (response: Client[]) => response ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Client' as const, id })),
              { type: 'Client', id: 'LIST' },
            ]
          : [{ type: 'Client', id: 'LIST' }],
    }),

    fetchClientById: builder.query<Client, number>({
      query: (clientId) => `/clients/client/${clientId}`,
      providesTags: (_result, _error, id) => [{ type: 'Client', id }],
    }),

    createClient: builder.mutation<Client, NewClient>({
      query: (client) => ({
        url: '/clients/client',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),

    updateClient: builder.mutation<Client, UpdatedClient>({
      query: (client) => ({
        url: `/clients/client/${client.id}`,
        method: 'PUT',
        body: client,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Client', id },
        { type: 'Client', id: 'LIST' },
      ],
    }),

    deleteClient: builder.mutation<void, number>({
      query: (clientId) => ({
        url: `/clients/client/${clientId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Client', id },
        { type: 'Client', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useFetchClientsQuery,
  useFetchClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
