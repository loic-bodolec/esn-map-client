import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWork, deleteWork, fetchWorks, updateWork } from '../api/works';
import { NewWork, UpdatedWork, Work } from '../types/Work';
import { handleAsyncError, ErrorResponse } from '../utils/errorUtils';

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

export const getWorks = createAsyncThunk<Work[]>(
  'works/getWorks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWorks();
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const addWork = createAsyncThunk<Work, NewWork>(
  'works/addWork',
  async (newWork, { rejectWithValue }) => {
    try {
      const response = await createWork(newWork);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const modifyWork = createAsyncThunk<Work, UpdatedWork>(
  'works/modifyWork',
  async (updatedWork, { rejectWithValue }) => {
    try {
      const response = await updateWork(updatedWork);
      return response;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

export const removeWork = createAsyncThunk<number, number>(
  'works/removeWork',
  async (workId, { rejectWithValue }) => {
    try {
      await deleteWork(workId);
      return workId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error as ErrorResponse | Error));
    }
  },
);

const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWorks.fulfilled, (state, action: PayloadAction<Work[]>) => {
        state.status = 'succeeded';
        state.works = action.payload;
      })
      .addCase(getWorks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addWork.fulfilled, (state, action: PayloadAction<Work>) => {
        state.works.push(action.payload);
      })
      .addCase(addWork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(modifyWork.fulfilled, (state, action: PayloadAction<Work>) => {
        const index = state.works.findIndex((work) => work.id === action.payload.id);
        if (index !== -1) {
          state.works[index] = action.payload;
        }
      })
      .addCase(modifyWork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeWork.fulfilled, (state, action: PayloadAction<number>) => {
        state.works = state.works.filter((work) => work.id !== action.payload);
      })
      .addCase(removeWork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default worksSlice.reducer;
