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
        if (jobIds.length > 0) {
          jobIds.forEach((id) => params.append('jobIds', id.toString()));
        }
        if (expertiseIds.length > 0) {
          expertiseIds.forEach((id) => params.append('expertiseIds', id.toString()));
        }
        return { url: '/clients', params };
      },
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
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Client', id }],
    }),
    deleteClient: builder.mutation<number, number>({
      query: (clientId) => ({
        url: `/clients/client/${clientId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Client', id }],
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
