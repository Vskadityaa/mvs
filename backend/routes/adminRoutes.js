import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireRole } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import * as admin from '../controllers/adminController.js';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/dashboard', admin.dashboardStats);

router.get('/students', admin.listStudents);
router.post(
  '/students',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').optional().isLength({ min: 8 }),
  ],
  handleValidation,
  admin.createStudent
);
router.put('/students/:id', admin.updateStudent);
router.delete('/students/:id', admin.deleteStudent);

router.get('/teachers', admin.listTeachers);
router.post(
  '/teachers',
  [body('name').notEmpty(), body('email').isEmail()],
  handleValidation,
  admin.createTeacher
);
router.put('/teachers/:id', admin.updateTeacher);
router.delete('/teachers/:id', admin.deleteTeacher);

router.get('/classes', admin.listClasses);
router.post('/classes', admin.createClass);
router.put('/classes/:id', admin.updateClass);
router.delete('/classes/:id', admin.deleteClass);

router.get('/subjects', admin.listSubjects);
router.post('/subjects', admin.createSubject);
router.put('/subjects/:id', admin.updateSubject);
router.delete('/subjects/:id', admin.deleteSubject);

router.get('/admissions', admin.listAdmissions);
router.patch(
  '/admissions/:id',
  [body('status').isIn(['pending', 'approved', 'rejected'])],
  handleValidation,
  admin.updateAdmissionStatus
);

router.get('/notices', admin.listNotices);
router.post(
  '/notices',
  [
    body('title').notEmpty(),
    body('body').optional(),
    body('priority').optional().isIn(['low', 'normal', 'high']),
    body('audience').optional().isIn(['all', 'teachers', 'students']),
  ],
  handleValidation,
  admin.createNotice
);
router.put('/notices/:id', admin.updateNotice);
router.delete('/notices/:id', admin.deleteNotice);

router.get('/events', admin.listEvents);
router.post('/events', admin.createEvent);
router.put('/events/:id', admin.updateEvent);
router.delete('/events/:id', admin.deleteEvent);

router.get('/suggestions', admin.listSuggestions);
router.patch('/suggestions/:id', admin.updateSuggestionStatus);

router.get('/reports/fees', admin.feeReport);
router.get('/reports/attendance', admin.attendanceReport);
router.get('/reports/students', admin.studentsReport);
router.get('/feedback', admin.listFeedback);
router.get('/notes', admin.listNotesAdmin);

router.post('/seed-demo', admin.seedDemo);

export default router;
