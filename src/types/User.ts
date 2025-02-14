export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  role: UserRole;
}

export interface NewUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  role: UserRole;
}

export interface UpdatedUser {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  role: UserRole;
}
