import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createClient,
  deleteClient,
  fetchClientById,
  fetchClients,
  updateClient,
} from '../api/clients';
import { Client, NewClient, UpdatedClient } from '../types/Client';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

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

export const getClients = createAsyncThunk<
  Client[],
  { jobIds?: number[]; expertiseIds?: number[] }
>('clients/getClients', async ({ jobIds, expertiseIds }, { rejectWithValue }) => {
  try {
    const response = await fetchClients({ jobIds, expertiseIds });
    return response;
  } catch (error) {
    return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
  }
});

export const getClientById = createAsyncThunk<Client, number>(
  'clients/getClientById',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await fetchClientById(clientId);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const addClient = createAsyncThunk<Client, NewClient>(
  'clients/addClient',
  async (newClient, { rejectWithValue }) => {
    try {
      const response = await createClient(newClient);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyClient = createAsyncThunk<Client, UpdatedClient>(
  'clients/modifyClient',
  async (updatedClient, { rejectWithValue }) => {
    try {
      const response = await updateClient(updatedClient);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeClient = createAsyncThunk<number, number>(
  'clients/removeClient',
  async (clientId, { rejectWithValue }) => {
    try {
      await deleteClient(clientId);
      return clientId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    resetClientDetails: (state) => {
      state.clientDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getClientById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getClientById.fulfilled, (state, action: PayloadAction<Client>) => {
        state.status = 'succeeded';
        state.clientDetails = action.payload;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addClient.fulfilled, (state, action: PayloadAction<Client>) => {
        state.clients.push(action.payload);
      })
      .addCase(modifyClient.fulfilled, (state, action: PayloadAction<Client>) => {
        state.clients = state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client,
        );
      })
      .addCase(removeClient.fulfilled, (state, action: PayloadAction<number>) => {
        state.clients = state.clients.filter((client) => client.id !== action.payload);
      });
  },
});

export const { resetClientDetails } = clientsSlice.actions;
export default clientsSlice.reducer;
