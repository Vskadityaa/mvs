import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  firebaseLogin,
  me,
  registerValidators,
  loginValidators,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post('/register', registerValidators, handleValidation, register);
router.post('/login', loginValidators, handleValidation, login);
router.post(
  '/firebase',
  [body('idToken').notEmpty(), body('role').optional().isIn(['admin', 'teacher', 'student'])],
  handleValidation,
  firebaseLogin
);
router.get('/me', authenticate, me);

export default router;
