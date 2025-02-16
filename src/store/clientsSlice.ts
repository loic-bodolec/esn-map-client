import { createSlice } from '@reduxjs/toolkit';
import { Client } from '../types/Client';

interface ClientsState {
  clients: Client[];
  clientDetails: Client | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  clientDetails: null,
  status: 'idle',
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    resetClientDetails: (state) => {
      state.clientDetails = null;
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetClientDetails } = clientsSlice.actions;
export default clientsSlice.reducer;
