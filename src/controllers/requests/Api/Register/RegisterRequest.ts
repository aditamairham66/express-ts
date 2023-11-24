import { check, body } from 'express-validator';

export const RegisterRequest = [
  check('username').notEmpty().withMessage('Username is required'),
  check('username').isEmail().withMessage('Username must be email'),
  check('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 5 }).withMessage('Password minimal 5 karakter'),
];
