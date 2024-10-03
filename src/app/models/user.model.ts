import {Role} from "./role.model";

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  roles?: Role[];
}
