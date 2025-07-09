import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedLayout from './Components/ProtectedLayout/ProtectedLayout';

const Login = lazy(() => import('./Pages/Login/Login'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Consultants = lazy(() => import('./Pages/Consultants/Consultants'));
const Clients = lazy(() => import('./Pages/Clients/Clients'));
const ClientDetails = lazy(() => import('./Pages/ClientDetails/ClientDetails'));
const Company = lazy(() => import('./Pages/Company/Company'));
const Users = lazy(() => import('./Pages/Users/Users'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/connexion' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedLayout />}>
                <Route path='/carte' element={<Home />} />
                <Route path='/societe' element={<Company />} />
                <Route path='/consultants' element={<Consultants />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/client-details/:clientId' element={<ClientDetails />} />
                <Route path='/utilisateurs' element={<Users />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='/connexion' />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
