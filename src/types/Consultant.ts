import { Client } from './Client';
import { Techno } from './Techno';
import { Work } from './Work';

export interface Consultant {
  id: number;
  firstname: string;
  lastname: string;
  technos: Techno[];
  work: Work;
  client: Client;
}

export interface NewConsultant {
  firstname: string;
  lastname: string;
  clientId: number | undefined;
  technoIds: number[];
  workId: number | undefined;
}

export interface UpdatedConsultant {
  id: number;
  firstname: string;
  lastname: string;
  clientId: number;
  technoIds: number[];
  workId: number;
}
