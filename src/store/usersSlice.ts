import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: () => {
    // Vous pouvez ajouter des cas supplémentaires ici si nécessaire
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
