import { NewWork, UpdatedWork, Work } from '../types/Work';
import axiosInstance from './axiosInstance';

export const fetchWorks = async (): Promise<Work[]> => {
  const response = await axiosInstance.get('/works');
  return response.data;
};

export const fetchWorkById = async (workId: number): Promise<Work> => {
  const response = await axiosInstance.get(`/works/work/${workId}`);
  return response.data;
};

export const createWork = async (work: NewWork): Promise<Work> => {
  const response = await axiosInstance.post('/works/work/', work);
  return response.data;
};

export const updateWork = async (work: UpdatedWork): Promise<Work> => {
  const response = await axiosInstance.put(`/works/work/${work.id}`, work);
  return response.data;
};

export const deleteWork = async (workId: number): Promise<void> => {
  await axiosInstance.delete(`/works/work/${workId}`);
};
