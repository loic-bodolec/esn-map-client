import axiosInstance from './axiosInstance';

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

export const loginAPI = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};
