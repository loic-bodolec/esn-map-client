import { createSlice } from '@reduxjs/toolkit';
import { Job } from '../../types/Job';

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

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetJobs(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
