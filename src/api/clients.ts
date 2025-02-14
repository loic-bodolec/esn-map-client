import { NewClient, UpdatedClient } from '../types/Client';
import axiosInstance from './axiosInstance';

export const fetchClients = async ({
  jobIds = [],
  expertiseIds = [],
}: {
  jobIds?: number[];
  expertiseIds?: number[];
}) => {
  const params = new URLSearchParams();
  if (jobIds && jobIds.length > 0) {
    jobIds.forEach((id) => params.append('jobIds', id.toString()));
  }
  if (expertiseIds && expertiseIds.length > 0) {
    expertiseIds.forEach((id) => params.append('expertiseIds', id.toString()));
  }
  const response = await axiosInstance.get('/clients', { params });
  return response.data;
};

export const fetchClientById = async (clientId: number) => {
  const response = await axiosInstance.get(`/clients/client/${clientId}`);
  return response.data;
};

export const createClient = async (client: NewClient) => {
  const response = await axiosInstance.post('/clients/client', client);
  return response.data;
};

export const updateClient = async (client: UpdatedClient) => {
  const response = await axiosInstance.put(`/clients/client/${client.id}`, client);
  return response.data;
};

export const deleteClient = async (clientId: number) => {
  const response = await axiosInstance.delete(`/clients/client/${clientId}`);
  return response.data;
};
