import { body } from 'express-validator';
import Suggestion from '../models/Suggestion.js';
import Admission from '../models/Admission.js';
import Event from '../models/Event.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import Notice from '../models/Notice.js';

export const suggestionValidators = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 10 }),
];

export const contactValidators = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty(),
];

export const admissionPublicValidators = [
  body('studentName').trim().notEmpty(),
  body('parentName').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('phone').trim().notEmpty(),
  body('applyingClass').trim().notEmpty(),
];

export async function createSuggestion(req, res) {
  const doc = await Suggestion.create(req.body);
  res.status(201).json(doc);
}

export async function createContact(req, res) {
  const doc = await Suggestion.create({
    name: req.body.name,
    email: req.body.email,
    message: `[Contact] ${req.body.message}`,
  });
  res.status(201).json({ success: true, id: doc._id });
}

export async function createAdmission(req, res) {
  const doc = await Admission.create(req.body);
  res.status(201).json(doc);
}

export async function listPublicEvents(req, res) {
  const events = await Event.find().sort({ date: -1 }).limit(50);
  res.json(events);
}

export async function listPublicFaculty(req, res) {
  const teachers = await Teacher.find({ displayOnWebsite: true })
    .populate('user', 'name email')
    .populate('subjects', 'name')
    .sort({ createdAt: -1 });
  res.json(teachers);
}

export async function listPublicNoticesTicker(req, res) {
  const items = await Notice.find().sort({ createdAt: -1 }).limit(20);
  res.json(items);
}
