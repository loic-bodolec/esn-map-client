import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createConsultant,
  deleteConsultant,
  fetchConsultants,
  updateConsultant,
} from '../api/consultants';
import { Consultant, NewConsultant, UpdatedConsultant } from '../types/Consultant';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

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

export const getConsultants = createAsyncThunk<
  Consultant[],
  { technoIds?: number[]; workIds?: number[]; clientIds?: number[] }
>('consultants/getConsultants', async ({ technoIds, workIds, clientIds }, { rejectWithValue }) => {
  try {
    const response = await fetchConsultants({ technoIds, workIds, clientIds });
    return response;
  } catch (error) {
    return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
  }
});

export const addConsultant = createAsyncThunk<Consultant, NewConsultant>(
  'consultants/addConsultant',
  async (newConsultant, { rejectWithValue }) => {
    try {
      const response = await createConsultant(newConsultant);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyConsultant = createAsyncThunk<Consultant, UpdatedConsultant>(
  'consultants/modifyConsultant',
  async (updatedConsultant, { rejectWithValue }) => {
    try {
      const response = await updateConsultant(updatedConsultant);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeConsultant = createAsyncThunk<number, number>(
  'consultants/removeConsultant',
  async (consultantId, { rejectWithValue }) => {
    try {
      await deleteConsultant(consultantId);
      return consultantId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const consultantsSlice = createSlice({
  name: 'consultants',
  initialState,
  reducers: {
    resetConsultants(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsultants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getConsultants.fulfilled, (state, action: PayloadAction<Consultant[]>) => {
        state.status = 'succeeded';
        state.consultants = action.payload;
      })
      .addCase(getConsultants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addConsultant.fulfilled, (state, action: PayloadAction<Consultant>) => {
        state.consultants.push(action.payload);
      })
      .addCase(modifyConsultant.fulfilled, (state, action: PayloadAction<Consultant>) => {
        state.consultants = state.consultants.map((consultant) =>
          consultant.id === action.payload.id ? action.payload : consultant,
        );
      })
      .addCase(removeConsultant.fulfilled, (state, action: PayloadAction<number>) => {
        state.consultants = state.consultants.filter(
          (consultant) => consultant.id !== action.payload,
        );
      });
  },
});

export const { resetConsultants } = consultantsSlice.actions;
export default consultantsSlice.reducer;
