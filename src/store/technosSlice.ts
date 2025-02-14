import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTechno, deleteTechno, fetchTechnos, updateTechno } from '../api/technos';
import { NewTechno, Techno, UpdatedTechno } from '../types/Techno';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

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

export const getTechnos = createAsyncThunk<Techno[]>(
  'technos/getTechnos',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTechnos();
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const addTechno = createAsyncThunk<Techno, NewTechno>(
  'technos/addTechno',
  async (newTechno, { rejectWithValue }) => {
    try {
      return await createTechno(newTechno);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyTechno = createAsyncThunk<Techno, UpdatedTechno>(
  'technos/modifyTechno',
  async (updatedTechno, { rejectWithValue }) => {
    try {
      return await updateTechno(updatedTechno);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeTechno = createAsyncThunk<number, number>(
  'technos/removeTechno',
  async (technoId, { rejectWithValue }) => {
    try {
      await deleteTechno(technoId);
      return technoId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const technosSlice = createSlice({
  name: 'technos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTechnos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTechnos.fulfilled, (state, action: PayloadAction<Techno[]>) => {
        state.status = 'succeeded';
        state.technos = action.payload;
      })
      .addCase(getTechnos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addTechno.fulfilled, (state, action: PayloadAction<Techno>) => {
        state.technos.push(action.payload);
      })
      .addCase(addTechno.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(modifyTechno.fulfilled, (state, action: PayloadAction<Techno>) => {
        const index = state.technos.findIndex((techno) => techno.id === action.payload.id);
        if (index !== -1) {
          state.technos[index] = action.payload;
        }
      })
      .addCase(modifyTechno.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeTechno.fulfilled, (state, action: PayloadAction<number>) => {
        state.technos = state.technos.filter((techno) => techno.id !== action.payload);
      })
      .addCase(removeTechno.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default technosSlice.reducer;
