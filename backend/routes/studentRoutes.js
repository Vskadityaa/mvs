import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireRole } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import * as s from '../controllers/studentController.js';

const router = Router();

router.use(authenticate, requireRole('student'));

router.get('/me', s.myProfile);
router.get('/attendance', s.myAttendance);
router.get('/homework', s.myHomework);
router.get('/notes', s.myNotes);
router.get('/marks', s.myMarks);
router.get('/notices', s.noticesMongo);
router.get('/notices-firestore', s.noticesFirestoreMeta);

router.post(
  '/feedback',
  [body('message').isLength({ min: 5 })],
  handleValidation,
  s.submitFeedback
);

router.post('/documents', s.uploadDocMiddleware, s.uploadDocument);
router.get('/notifications', s.myNotifications);
router.patch('/notifications/:id/read', s.markNotificationRead);

router.post(
  '/chat',
  [body('text').trim().isLength({ min: 1, max: 2000 })],
  handleValidation,
  s.chatPost
);

export default router;
