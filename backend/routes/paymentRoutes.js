import { Router } from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  verifyPayment,
  listMyPayments,
  adminListPayments,
} from '../controllers/paymentController.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post(
  '/order',
  authenticate,
  requireRole('student'),
  [body('amount').isFloat({ gt: 0 }), body('purpose').optional().isString()],
  handleValidation,
  createOrder
);

router.post(
  '/verify',
  authenticate,
  requireRole('student'),
  [
    body('razorpay_order_id').notEmpty(),
    body('razorpay_payment_id').notEmpty(),
    body('razorpay_signature').notEmpty(),
    body('paymentId').notEmpty(),
  ],
  handleValidation,
  verifyPayment
);

router.get('/mine', authenticate, requireRole('student'), listMyPayments);
router.get('/all', authenticate, requireRole('admin'), adminListPayments);

export default router;
