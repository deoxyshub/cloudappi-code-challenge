import { Address } from "./Address";

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  birthDate?: string;
  address?: Address;
}
