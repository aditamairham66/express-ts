import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/type';
import JwtToken from '../utils/jwtToken';
import ResponseHelper from '../utils/responseHelper';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    ResponseHelper.sendError(401, 'Unauthorized: Token not provided');
    return;
  }

  const [ ,tokenValue] = token.split(' ');
  
  const decoded = JwtToken.verifyToken(tokenValue);
  if (typeof decoded === 'string') {
    ResponseHelper.sendError(403, `Forbidden: ${decoded}`);
    return;
  }

  req.user = decoded as UserRequest;
  next();
};
