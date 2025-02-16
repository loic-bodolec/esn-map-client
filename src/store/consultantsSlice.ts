import { createSlice } from '@reduxjs/toolkit';
import { Consultant } from '../types/Consultant';

interface ConsultantsState {
  consultants: Consultant[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ConsultantsState = {
  consultants: [],
  status: 'idle',
  error: null,
};

const consultantsSlice = createSlice({
  name: 'consultants',
  initialState,
  reducers: {
    resetConsultants(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetConsultants } = consultantsSlice.actions;
export default consultantsSlice.reducer;
