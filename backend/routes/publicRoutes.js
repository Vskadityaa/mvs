import { Router } from 'express';
import {
  createSuggestion,
  createContact,
  createAdmission,
  listPublicEvents,
  listPublicFaculty,
  listPublicNoticesTicker,
  suggestionValidators,
  contactValidators,
  admissionPublicValidators,
} from '../controllers/publicController.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post('/suggestions', suggestionValidators, handleValidation, createSuggestion);
router.post('/contact', contactValidators, handleValidation, createContact);
router.post('/admissions', admissionPublicValidators, handleValidation, createAdmission);
router.get('/events', listPublicEvents);
router.get('/faculty', listPublicFaculty);
router.get('/notices-ticker', listPublicNoticesTicker);

export default router;
