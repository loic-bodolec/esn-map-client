import { NewTechno, Techno, UpdatedTechno } from '../types/Techno';
import axiosInstance from './axiosInstance';

export const fetchTechnos = async (): Promise<Techno[]> => {
  const response = await axiosInstance.get('/technos');
  return response.data;
};

export const fetchTechnoById = async (technoId: number): Promise<Techno> => {
  const response = await axiosInstance.get(`/technos/techno/${technoId}`);
  return response.data;
};

export const createTechno = async (techno: NewTechno): Promise<Techno> => {
  const response = await axiosInstance.post('/technos/techno/', techno);
  return response.data;
};

export const updateTechno = async (techno: UpdatedTechno): Promise<Techno> => {
  const response = await axiosInstance.put(`/technos/techno/${techno.id}`, techno);
  return response.data;
};

export const deleteTechno = async (technoId: number): Promise<void> => {
  await axiosInstance.delete(`/technos/techno/${technoId}`);
};
