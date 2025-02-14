import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createExpertise,
  deleteExpertise,
  fetchExpertiseById,
  fetchExpertises,
  updateExpertise,
} from '../api/expertises';
import { Expertise, NewExpertise, UpdatedExpertise } from '../types/Expertise';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

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

export const getExpertises = createAsyncThunk<Expertise[]>(
  'expertises/getExpertises',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchExpertises();
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const getExpertiseById = createAsyncThunk<Expertise, number>(
  'expertises/getExpertiseById',
  async (expertiseId, { rejectWithValue }) => {
    try {
      return await fetchExpertiseById(expertiseId);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const addExpertise = createAsyncThunk<Expertise, NewExpertise>(
  'expertises/addExpertise',
  async (newExpertise, { rejectWithValue }) => {
    try {
      return await createExpertise(newExpertise);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyExpertise = createAsyncThunk<Expertise, UpdatedExpertise>(
  'expertises/modifyExpertise',
  async (updatedExpertise, { rejectWithValue }) => {
    try {
      return await updateExpertise(updatedExpertise);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeExpertise = createAsyncThunk<number, number>(
  'expertises/removeExpertise',
  async (expertiseId, { rejectWithValue }) => {
    try {
      await deleteExpertise(expertiseId);
      return expertiseId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const expertisesSlice = createSlice({
  name: 'expertises',
  initialState,
  reducers: {
    resetExpertises(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpertises.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getExpertises.fulfilled, (state, action: PayloadAction<Expertise[]>) => {
        state.status = 'succeeded';
        state.expertises = action.payload;
      })
      .addCase(getExpertises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getExpertiseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getExpertiseById.fulfilled, (state, action: PayloadAction<Expertise>) => {
        state.status = 'succeeded';
        state.expertiseDetails = action.payload;
      })
      .addCase(getExpertiseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addExpertise.fulfilled, (state, action: PayloadAction<Expertise>) => {
        state.expertises.push(action.payload);
      })
      .addCase(modifyExpertise.fulfilled, (state, action: PayloadAction<Expertise>) => {
        state.expertises = state.expertises.map((expertise) =>
          expertise.id === action.payload.id ? action.payload : expertise,
        );
      })
      .addCase(removeExpertise.fulfilled, (state, action: PayloadAction<number>) => {
        state.expertises = state.expertises.filter((expertise) => expertise.id !== action.payload);
      });
  },
});

export const { resetExpertises } = expertisesSlice.actions;
export default expertisesSlice.reducer;
