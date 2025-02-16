import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { Job, NewJob, UpdatedJob } from '../../types/Job';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: baseQuery,
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    fetchJobs: builder.query<Job[], void>({
      query: () => '/jobs',
      transformResponse: (response: Job[]) => response ?? [],
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Job' as const, id })), { type: 'Job', id: 'LIST' }]
          : [{ type: 'Job', id: 'LIST' }],
    }),

    fetchJobById: builder.query<Job, number>({
      query: (jobId) => `/jobs/job/${jobId}`,
      providesTags: (_result, _error, id) => [{ type: 'Job', id }],
    }),

    createJob: builder.mutation<Job, NewJob>({
      query: (job) => ({
        url: '/jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),

    updateJob: builder.mutation<Job, UpdatedJob>({
      query: (job) => ({
        url: `/jobs/job/${job.id}`,
        method: 'PUT',
        body: job,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Job', id },
        { type: 'Job', id: 'LIST' },
      ],
    }),

    deleteJob: builder.mutation<void, number>({
      query: (jobId) => ({
        url: `/jobs/job/${jobId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Job', id },
        { type: 'Job', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useFetchJobsQuery,
  useFetchJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
