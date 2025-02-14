import { NewConsultant, UpdatedConsultant } from '../types/Consultant';
import axiosInstance from './axiosInstance';

export const fetchConsultants = async ({
  technoIds = [],
  workIds = [],
  clientIds = [],
}: {
  technoIds?: number[];
  workIds?: number[];
  clientIds?: number[];
} = {}) => {
  const params = new URLSearchParams();
  if (technoIds && technoIds.length > 0) {
    technoIds.forEach((id) => params.append('technoIds', id.toString()));
  }
  if (workIds && workIds.length > 0) {
    workIds.forEach((id) => params.append('workIds', id.toString()));
  }
  if (clientIds && clientIds.length > 0) {
    clientIds.forEach((id) => params.append('clientIds', id.toString()));
  }
  const response = await axiosInstance.get('/consultants', { params });
  return response.data;
};

export const fetchConsultantById = async (consultantId: number) => {
  const response = await axiosInstance.get(`/consultants/consultant/${consultantId}`);
  return response.data;
};

export const createConsultant = async (consultant: NewConsultant) => {
  const response = await axiosInstance.post('/consultants/consultant', consultant);
  return response.data;
};

export const updateConsultant = async (consultant: UpdatedConsultant) => {
  const response = await axiosInstance.put(`/consultants/consultant/${consultant.id}`, consultant);
  return response.data;
};

export const deleteConsultant = async (consultantId: number) => {
  const response = await axiosInstance.delete(`/consultants/consultant/${consultantId}`);
  return response.data;
};
