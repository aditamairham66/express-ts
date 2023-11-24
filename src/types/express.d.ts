// src/types/express.d.ts
import { UserRequest } from '../types/type';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserRequest;
      token?: string;
    }
  }
}
