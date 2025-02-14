import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createJob, deleteJob, fetchJobById, fetchJobs, updateJob } from '../api/jobs';
import { Job, NewJob, UpdatedJob } from '../types/Job';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

interface JobsState {
  jobs: Job[];
  jobDetails: Job | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  jobDetails: null,
  status: 'idle',
  error: null,
};

export const getJobs = createAsyncThunk<Job[]>('jobs/getJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchJobs();
    return response;
  } catch (error) {
    return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
  }
});

export const getJobById = createAsyncThunk<Job, number>(
  'jobs/getJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await fetchJobById(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const addJob = createAsyncThunk<Job, NewJob>(
  'jobs/addJob',
  async (newJob, { rejectWithValue }) => {
    try {
      const response = await createJob(newJob);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyJob = createAsyncThunk<Job, UpdatedJob>(
  'jobs/modifyJob',
  async (updatedJob, { rejectWithValue }) => {
    try {
      const response = await updateJob(updatedJob);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeJob = createAsyncThunk<number, number>(
  'jobs/removeJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await deleteJob(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetJobs(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getJobById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.status = 'succeeded';
        state.jobDetails = action.payload;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobs.push(action.payload);
      })
      .addCase(modifyJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobs = state.jobs.map((job) => (job.id === action.payload.id ? action.payload : job));
      })
      .addCase(removeJob.fulfilled, (state, action: PayloadAction<number>) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      });
  },
});

export const { resetJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
