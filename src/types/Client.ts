import { Consultant } from './Consultant';
import { Expertise } from './Expertise';
import { Job } from './Job';

export interface Client {
  id: number;
  name: string;
  activity: string;
  address: string;
  latitude: string;
  longitude: string;
  logo: string | null;
  link: string | null;
  jobs: Job[];
  expertises: Expertise[];
  consultants?: Consultant[];
}

export interface NewClient {
  name: string;
  activity: string;
  address: string;
  latitude?: string;
  longitude?: string;
  logo: string | null;
  link: string | null;
  expertiseIds: number[];
  jobIds: number[];
}

export interface UpdatedClient {
  id: number;
  name: string;
  activity: string;
  address: string;
  latitude?: string;
  longitude?: string;
  logo: string | null;
  link: string | null;
  expertiseIds: number[];
  jobIds: number[];
}
