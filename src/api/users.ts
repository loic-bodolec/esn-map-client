import { NewUser, UpdatedUser } from '../types/User';
import axiosInstance from './axiosInstance';

export const fetchUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const fetchUserById = async (userId: number) => {
  const response = await axiosInstance.get(`/users/user/${userId}`);
  return response.data;
};

export const createUser = async (user: NewUser) => {
  const response = await axiosInstance.post('/users/user', user);
  return response.data;
};

export const updateUser = async (user: UpdatedUser) => {
  const response = await axiosInstance.put(`/users/user/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axiosInstance.delete(`/users/user/${userId}`);
  return response.data;
};
