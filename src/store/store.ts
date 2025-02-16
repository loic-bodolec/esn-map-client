import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from './api/authApi';
import { clientsApi } from './api/clientsApi';
import { consultantsApi } from './api/consultantsApi';
import { expertisesApi } from './api/expertisesApi';
import { jobsApi } from './api/jobsApi';
import { technosApi } from './api/technosApi';
import { usersApi } from './api/usersApi';
import { worksApi } from './api/worksApi';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';
import consultantsReducer from './slices/consultantsSlice';
import expertisesReducer from './slices/expertisesSlice';
import jobsReducer from './slices/jobsSlice';
import technosReducer from './slices/technosSlice';
import usersReducer from './slices/usersSlice';
import worksReducer from './slices/worksSlice';

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
    // Add API reducers
    [authApi.reducerPath]: authApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [consultantsApi.reducerPath]: consultantsApi.reducer,
    [expertisesApi.reducerPath]: expertisesApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [technosApi.reducerPath]: technosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [worksApi.reducerPath]: worksApi.reducer,
  },
  // Add API middleware to enable caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      clientsApi.middleware,
      consultantsApi.middleware,
      usersApi.middleware,
      expertisesApi.middleware,
      jobsApi.middleware,
      technosApi.middleware,
      worksApi.middleware,
    ),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
