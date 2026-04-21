import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireRole } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import * as t from '../controllers/teacherController.js';

const router = Router();

router.use(authenticate, requireRole('teacher'));

router.get('/profile/classes', t.myClasses);
router.get('/classes/:classId/students', t.classStudents);
router.get('/classes/:classId/attendance', t.listAttendanceForClass);

router.post(
  '/attendance',
  [
    body('classRef').notEmpty(),
    body('date').notEmpty(),
    body('entries').isArray({ min: 1 }),
  ],
  handleValidation,
  t.markAttendance
);

router.post(
  '/homework',
  t.uploadMiddleware,
  [
    body('title').notEmpty(),
    body('classRef').notEmpty(),
    body('description').optional(),
    body('dueDate').optional(),
    body('subject').optional(),
  ],
  handleValidation,
  t.createHomework
);

router.post(
  '/notes',
  t.uploadMiddleware,
  [body('title').notEmpty(), body('classRef').notEmpty()],
  handleValidation,
  t.uploadNote
);

router.post(
  '/marks',
  [
    body('student').notEmpty(),
    body('subject').notEmpty(),
    body('classRef').notEmpty(),
    body('examName').notEmpty(),
    body('obtained').isNumeric(),
  ],
  handleValidation,
  t.enterMarks
);

router.get('/announcements', t.teacherAnnouncements);
router.post('/profile/photo', t.uploadMiddleware, t.updateTeacherProfilePhoto);

export default router;
