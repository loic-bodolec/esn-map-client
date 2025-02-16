import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../api/authApi';
import { clientsApi } from '../api/clientsApi';
import { consultantsApi } from '../api/consultantsApi';
import { expertisesApi } from '../api/expertisesApi';
import { jobsApi } from '../api/jobsApi';
import { technosApi } from '../api/technosApi';
import { usersApi } from '../api/usersApi';
import { worksApi } from '../api/worksApi';
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
    // Ajoutez les réducteurs de l'API
    [authApi.reducerPath]: authApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [consultantsApi.reducerPath]: consultantsApi.reducer,
    [expertisesApi.reducerPath]: expertisesApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [technosApi.reducerPath]: technosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [worksApi.reducerPath]: worksApi.reducer,
  },
  // Ajoutez le middleware de l'API pour activer le caching, l'invalidation, le polling, etc.
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

// Optionnel, mais nécessaire pour les comportements refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
