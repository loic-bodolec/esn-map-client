import { NewJob, UpdatedJob } from '../types/Job';
import axiosInstance from './axiosInstance';

export const fetchJobs = async () => {
  const response = await axiosInstance.get('/jobs');
  return response.data;
};

export const fetchJobById = async (jobId: number) => {
  const response = await axiosInstance.get(`/jobs/job/${jobId}`);
  return response.data;
};

export const createJob = async (job: NewJob) => {
  const response = await axiosInstance.post('/jobs', job);
  return response.data;
};

export const updateJob = async (job: UpdatedJob) => {
  const response = await axiosInstance.put(`/jobs/job/${job.id}`, job);
  return response.data;
};

export const deleteJob = async (jobId: number) => {
  const response = await axiosInstance.delete(`/jobs/job/${jobId}`);
  return response.data;
};
