import { createSlice } from '@reduxjs/toolkit';
import { Expertise } from '../types/Expertise';

interface ExpertisesState {
  expertises: Expertise[];
  expertiseDetails: Expertise | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExpertisesState = {
  expertises: [],
  expertiseDetails: null,
  status: 'idle',
  error: null,
};

const expertisesSlice = createSlice({
  name: 'expertises',
  initialState,
  reducers: {
    resetExpertises(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetExpertises } = expertisesSlice.actions;
export default expertisesSlice.reducer;
