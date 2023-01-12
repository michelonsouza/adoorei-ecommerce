import { Address } from './address';

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface User {
  id: number;
  __v: number;
  email: string;
  phone: string;
  name: UserName;
  address: Address;
  username: string;
  password: string;
}
