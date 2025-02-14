import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clientsReducer from './clientsSlice';
import consultantsReducer from './consultantsSlice';
import expertisesReducer from './expertisesSlice';
import jobsReducer from './jobsSlice';
import technosReducer from './technosSlice';
import usersReducer from './usersSlice';
import worksReducer from './worksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    consultants: consultantsReducer,
    technos: technosReducer,
    works: worksReducer,
    clients: clientsReducer,
    jobs: jobsReducer,
    expertises: expertisesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
