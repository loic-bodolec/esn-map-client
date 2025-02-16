import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

interface LoginResponse {
  username: string;
  role: string;
  token: string;
}

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
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = 'succeeded';
          state.user = {
            username: action.payload.username,
            role: action.payload.role,
          };
          state.token = action.payload.token;
          sessionStorage.setItem('user', JSON.stringify(state.user));
          sessionStorage.setItem('token', state.token);
        },
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
