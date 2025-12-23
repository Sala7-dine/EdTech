import { Role } from '../enums/role.enum';

export interface RegisterDto {
  email: string;
  password: string;
  role: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: Role;
  };
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
  role: Role;
}
