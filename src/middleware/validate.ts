// src/middleware/validationMiddleware.ts
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ResponseHelper from '../utils/responseHelper';

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   ResponseHelper.sendError(422, errors.array()[0]?.msg as string);
   return;
  }
  next();
};

export default validationMiddleware;
