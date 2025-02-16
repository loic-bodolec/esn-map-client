import { createSlice } from '@reduxjs/toolkit';
import { Work } from '../types/Work';

interface WorksState {
  works: Work[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorksState = {
  works: [],
  status: 'idle',
  error: null,
};

const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    resetWorks(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetWorks } = worksSlice.actions;
export default worksSlice.reducer;
