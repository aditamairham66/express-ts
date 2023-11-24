// src/routes/tokenRoutes.ts
import express, { Request, Response, Router } from 'express';
import JwtToken from '../utils/jwtToken';
import basicAuth from 'express-basic-auth';
import ResponseHelper from '../utils/responseHelper';

const tokenRouter: Router = express.Router();

const users = {
  'BasicAuth': 'pass123456',
};

const basicAuthMiddleware = basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized: Invalid credentials',
});

tokenRouter.get('/generate', basicAuthMiddleware, (req: Request, res: Response) => {
  const token = JwtToken.generateToken({});

  ResponseHelper.sendData({
   token
  })
});

tokenRouter.get('/update', (req: Request, res: Response) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
   ResponseHelper.sendError(401, 'Unauthorized: Token not provided');
  }

  const currentToken = token as string; // Mendapatkan nilai token dari middleware authenticateToken
  const [ ,tokenValue] = currentToken.split(' ');

  // Implementasi pembaruan token sesuai kebutuhan
  const updatedToken = JwtToken.updateToken(tokenValue);
  
  ResponseHelper.sendData({
   token: updatedToken
  })
});

export default tokenRouter;
