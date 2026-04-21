import multer from 'multer';
import Attendance from '../models/Attendance.js';
import Homework from '../models/Homework.js';
import Marks from '../models/Marks.js';
import Student from '../models/Student.js';
import Note from '../models/Note.js';
import Notice from '../models/Notice.js';
import Feedback from '../models/Feedback.js';
import Notification from '../models/Notification.js';
import { getFirestore } from '../config/firebase.js';
import { uploadBufferToFirebase } from '../utils/uploadBuffer.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadDocMiddleware = upload.single('file');

export async function myProfile(req, res) {
  const s = await Student.findOne({ user: req.user._id })
    .populate('user', 'name email')
    .populate('class');
  if (!s) return res.status(404).json({ message: 'Student not found' });
  res.json(s);
}

export async function myAttendance(req, res) {
  const s = await Student.findOne({ user: req.user._id });
  if (!s) return res.status(404).json({ message: 'Not found' });
  const rows = await Attendance.find({ student: s._id })
    .populate('classRef', 'name section')
    .sort({ date: -1 })
    .limit(120);
  res.json(rows);
}

export async function myHomework(req, res) {
  const s = await Student.findOne({ user: req.user._id });
  if (!s?.class) return res.json([]);
  const items = await Homework.find({ classRef: s.class })
    .populate('subject', 'name')
    .sort({ createdAt: -1 });
  res.json(items);
}

export async function myNotes(req, res) {
  const s = await Student.findOne({ user: req.user._id });
  if (!s?.class) return res.json([]);
  const items = await Note.find({ classRef: s.class })
    .populate('subject', 'name')
    .sort({ createdAt: -1 });
  res.json(items);
}

export async function myMarks(req, res) {
  const s = await Student.findOne({ user: req.user._id });
  if (!s) return res.json([]);
  const items = await Marks.find({ student: s._id })
    .populate('subject', 'name')
    .populate('classRef', 'name section');
  res.json(items);
}

export async function noticesMongo(req, res) {
  const items = await Notice.find({ audience: { $in: ['all', 'students'] } })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(items);
}

export async function noticesFirestoreMeta(req, res) {
  const db = getFirestore();
  if (!db) {
    return res.json({ enabled: false, items: [] });
  }
  const snap = await db.collection('notices').orderBy('createdAt', 'desc').limit(30).get();
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  res.json({ enabled: true, items });
}

export async function submitFeedback(req, res) {
  const s = await Student.findOne({ user: req.user._id });
  if (!s) return res.status(404).json({ message: 'Not found' });
  const fb = await Feedback.create({
    student: s._id,
    message: req.body.message,
    category: req.body.category || 'general',
  });
  res.status(201).json(fb);
}

export async function uploadDocument(req, res) {
  if (!req.file) return res.status(400).json({ message: 'file required' });
  const s = await Student.findOne({ user: req.user._id });
  if (!s) return res.status(404).json({ message: 'Not found' });
  const url = await uploadBufferToFirebase(
    'student-docs',
    req.file.originalname,
    req.file.buffer,
    req.file.mimetype
  );
  s.documents = s.documents || [];
  s.documents.push({ name: req.body.label || req.file.originalname, url: url, uploadedAt: new Date() });
  await s.save();
  res.json(s);
}

export async function myNotifications(req, res) {
  const items = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(items);
}

export async function markNotificationRead(req, res) {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true }
  );
  res.json({ ok: true });
}

export async function chatPost(req, res) {
  const db = getFirestore();
  if (!db) {
    return res.status(503).json({ message: 'Firestore not configured' });
  }
  const s = await Student.findOne({ user: req.user._id });
  if (!s) return res.status(404).json({ message: 'Not found' });
  const ref = db.collection('class_chats').doc(String(s.class || 'general')).collection('messages');
  const doc = await ref.add({
    text: req.body.text,
    userId: String(req.user._id),
    name: req.user.name,
    role: 'student',
    createdAt: Date.now(),
  });
  res.status(201).json({ id: doc.id });
}
