// FIXME error "No reducer provided for key "auth"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import authReducer from '../../store/authSlice';
import clientsReducer from '../../store/clientsSlice';
import consultantsReducer from '../../store/consultantsSlice';
import expertisesReducer from '../../store/expertisesSlice';
import jobsReducer from '../../store/jobsSlice';
import technosReducer from '../../store/technosSlice';
import usersReducer from '../../store/usersSlice';
import worksReducer from '../../store/worksSlice';

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
      },
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

  test('displays error message on login failure', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
