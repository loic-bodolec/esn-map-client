import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginAPI } from '../api/authApi';

interface User {
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem('user') ?? 'null'),
  token: sessionStorage.getItem('token'),
  status: 'idle',
  error: null,
};

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  username: string;
  role: string;
  token: string;
}

export const login = createAsyncThunk<LoginResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      } else {
        return rejectWithValue('Network error');
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, initialState);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.user = {
          username: action.payload.username,
          role: action.payload.role,
        };
        state.token = action.payload.token;
        sessionStorage.setItem('user', JSON.stringify(state.user));
        sessionStorage.setItem('token', state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
