import { createSlice } from '@reduxjs/toolkit';
import { Techno } from '../../types/Techno';

interface TechnosState {
  technos: Techno[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TechnosState = {
  technos: [],
  status: 'idle',
  error: null,
};

const technosSlice = createSlice({
  name: 'technos',
  initialState,
  reducers: {
    resetTechnos(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetTechnos } = technosSlice.actions;
export default technosSlice.reducer;
