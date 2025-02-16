import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { User, NewUser, UpdatedUser } from '../../types/User';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    fetchUserById: builder.query<User, number>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<User, NewUser>({
      query: (user) => ({
        url: '/users/user',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, UpdatedUser>({
      query: (user) => ({
        url: `/users/user/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<number, number>({
      query: (userId) => ({
        url: `/users/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
