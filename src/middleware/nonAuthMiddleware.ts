import { Request, Response, NextFunction } from 'express';
import ResponseHelper from '../utils/responseHelper';

export const nonAuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
 const token = req.header('Authorization');

 if (!token || !token.startsWith('Bearer ')) {
   ResponseHelper.sendError(401, 'Unauthorized: Token not provided');
   return;
 }
 
 next();
};
