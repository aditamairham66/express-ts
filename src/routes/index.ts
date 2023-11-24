// src/routes/authRoutes.ts
import express, { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { nonAuthenticateToken } from '../middleware/nonAuthMiddleware';
import authRouters from './authRoutes';

const unProtectedRouter: Router = express.Router();
const protectedRouter: Router = express.Router();

// Middleware khusus untuk unProtectedRouter
unProtectedRouter.use(nonAuthenticateToken);
unProtectedRouter.use('/auth', authRouters);

// Middleware khusus untuk protectedRouter
protectedRouter.use(authenticateToken);
protectedRouter.get('/protected', (req, res) => {
 res.json({ message: 'This is a protected route' });
});

// Gabungkan kedua router
const router: Router = express.Router();
router.use('', unProtectedRouter);
router.use('', protectedRouter);

export default router;
