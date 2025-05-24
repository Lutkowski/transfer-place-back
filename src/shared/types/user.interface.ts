import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    phone: string;
    name: string | null;
    isAdmin: boolean;
    iat: number;
    exp: number;
  };
}
