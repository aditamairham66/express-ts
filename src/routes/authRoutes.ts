// src/routes/authRoutes.ts
import express, { Router } from 'express';
import { register, login } from '../controllers/authController';
import { RegisterRequest } from '../controllers/requests/Api/Register/RegisterRequest';
import validationMiddleware from '../middleware/validate';

const router: Router = express.Router();

router.post('/register', RegisterRequest, validationMiddleware, register);
router.post('/login', login);

export default router;
