import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});

export default baseQuery;
