import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/baseQuery';

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  username: string;
  role: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Credentials>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
