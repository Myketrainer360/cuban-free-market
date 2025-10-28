export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer'
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
