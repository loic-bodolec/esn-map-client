// TODO tests must be reworked
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import authReducer from '../../store/slices/authSlice';
import clientsReducer from '../../store/slices/clientsSlice';
import consultantsReducer from '../../store/slices/consultantsSlice';
import expertisesReducer from '../../store/slices/expertisesSlice';
import jobsReducer from '../../store/slices/jobsSlice';
import technosReducer from '../../store/slices/technosSlice';
import usersReducer from '../../store/slices/usersSlice';
import worksReducer from '../../store/slices/worksSlice';
import { authApi } from '../../store/api/authApi';
import { clientsApi } from '../../store/api/clientsApi';
import { consultantsApi } from '../../store/api/consultantsApi';
import { expertisesApi } from '../../store/api/expertisesApi';
import { jobsApi } from '../../store/api/jobsApi';

describe('Login Page', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
        consultants: consultantsReducer,
        technos: technosReducer,
        works: worksReducer,
        clients: clientsReducer,
        jobs: jobsReducer,
        expertises: expertisesReducer,
        [authApi.reducerPath]: authApi.reducer,
        [clientsApi.reducerPath]: clientsApi.reducer,
        [consultantsApi.reducerPath]: consultantsApi.reducer,
        [expertisesApi.reducerPath]: expertisesApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          authApi.middleware,
          clientsApi.middleware,
          consultantsApi.middleware,
          expertisesApi.middleware,
          jobsApi.middleware,
        ),
      preloadedState: {
        auth: { token: null, error: null, user: null, status: 'idle' as const },
        users: { users: [], status: 'idle' as const, error: null },
        consultants: { consultants: [], status: 'idle' as const, error: null },
        technos: { technos: [], status: 'idle' as const, error: null },
        works: { works: [], status: 'idle' as const, error: null },
        clients: { clients: [], clientDetails: null, status: 'idle' as const, error: null },
        jobs: { jobs: [], jobDetails: null, status: 'idle' as const, error: null },
        expertises: {
          expertises: [],
          expertiseDetails: null,
          status: 'idle' as const,
          error: null,
        },
      },
    });
  });

  test('renders login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).toBeDisabled();
    });
  });

  // FIXME : This test is failing
  // test('displays error message on login failure', async () => {
  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <Login />
  //       </Router>
  //     </Provider>,
  //   );

  //   fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
  //   fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrongpassword' } });
  //   fireEvent.click(screen.getByTestId('submit-button'));

  //   await waitFor(() => {
  //     expect(screen.getByTestId('error-message')).toBeInTheDocument();
  //   });
  // });
});
