import { NewExpertise, UpdatedExpertise } from '../types/Expertise';
import axiosInstance from './axiosInstance';

export const fetchExpertises = async () => {
  const response = await axiosInstance.get('/expertises');
  return response.data;
};

export const fetchExpertiseById = async (expertiseId: number) => {
  const response = await axiosInstance.get(`/expertises/expertise/${expertiseId}`);
  return response.data;
};

export const createExpertise = async (expertise: NewExpertise) => {
  const response = await axiosInstance.post('/expertises', expertise);
  return response.data;
};

export const updateExpertise = async (expertise: UpdatedExpertise) => {
  const response = await axiosInstance.put(`/expertises/expertise/${expertise.id}`, expertise);
  return response.data;
};

export const deleteExpertise = async (expertiseId: number) => {
  const response = await axiosInstance.delete(`/expertises/expertise/${expertiseId}`);
  return response.data;
};
