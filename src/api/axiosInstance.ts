import axios from 'axios';
import store, { RootState } from '../store/store';

const axiosInstance = axios.create({
  // for development purposes only
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  },
);

export default axiosInstance;
