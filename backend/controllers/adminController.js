import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';
import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';
import Homework from '../models/Homework.js';
import Notice from '../models/Notice.js';
import Suggestion from '../models/Suggestion.js';
import Payment from '../models/Payment.js';
import Event from '../models/Event.js';
import Admission from '../models/Admission.js';
import Note from '../models/Note.js';
import Feedback from '../models/Feedback.js';
import Notification from '../models/Notification.js';
import { syncNoticeToFirestore, deleteNoticeFromFirestore } from '../utils/firestoreNotice.js';

export async function dashboardStats(req, res) {
  const [students, teachers, classes, paymentsAgg, attendanceToday] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Class.countDocuments(),
    Payment.aggregate([
      { $match: { status: { $in: ['paid', 'dummy'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Attendance.countDocuments({
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }),
  ]);

  const feeTotals = await Payment.aggregate([
    { $match: { status: { $in: ['paid', 'dummy'] } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } },
        amount: { $sum: '$amount' },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 12 },
  ]);

  res.json({
    counts: { students, teachers, classes, attendanceToday },
    revenue: paymentsAgg[0]?.total || 0,
    feeTrend: feeTotals.map((r) => ({ month: r._id, amount: r.amount })),
  });
}

export async function listStudents(req, res) {
  const q = req.query.q || '';
  const filter = q
    ? {
        $or: [
          { admissionNo: new RegExp(q, 'i') },
          { rollNo: new RegExp(q, 'i') },
        ],
      }
    : {};
  const items = await Student.find(filter)
    .populate('user', 'name email isActive')
    .populate('class', 'name section')
    .sort({ createdAt: -1 });
  res.json(items);
}

export async function createStudent(req, res) {
  const { name, email, password, ...rest } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email exists' });
  }
  const hash = await bcrypt.hash(password || 'changeme123', 12);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hash,
    role: 'student',
  });
  const student = await Student.create({ user: user._id, ...rest });
  res.status(201).json(await Student.findById(student._id).populate('user class'));
}

export async function updateStudent(req, res) {
  const s = await Student.findById(req.params.id).populate('user');
  if (!s) return res.status(404).json({ message: 'Not found' });
  const { name, email, password, userActive, ...rest } = req.body;
  if (name) s.user.name = name;
  if (email) s.user.email = email.toLowerCase();
  if (password) s.user.password = await bcrypt.hash(password, 12);
  if (typeof userActive === 'boolean') s.user.isActive = userActive;
  await s.user.save();
  Object.assign(s, rest);
  await s.save();
  res.json(await Student.findById(s._id).populate('user class'));
}

export async function deleteStudent(req, res) {
  const s = await Student.findById(req.params.id);
  if (!s) return res.status(404).json({ message: 'Not found' });
  await User.findByIdAndDelete(s.user);
  await s.deleteOne();
  res.json({ ok: true });
}

export async function listTeachers(req, res) {
  const items = await Teacher.find()
    .populate('user', 'name email isActive')
    .populate('classes subjects')
    .sort({ createdAt: -1 });
  res.json(items);
}

export async function createTeacher(req, res) {
  const { name, email, password, ...rest } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password || 'changeme123', 12);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hash,
    role: 'teacher',
  });
  const teacher = await Teacher.create({ user: user._id, ...rest });
  res.status(201).json(await Teacher.findById(teacher._id).populate('user classes subjects'));
}

export async function updateTeacher(req, res) {
  const t = await Teacher.findById(req.params.id).populate('user');
  if (!t) return res.status(404).json({ message: 'Not found' });
  const { name, email, password, userActive, ...rest } = req.body;
  if (name) t.user.name = name;
  if (email) t.user.email = email.toLowerCase();
  if (password) t.user.password = await bcrypt.hash(password, 12);
  if (typeof userActive === 'boolean') t.user.isActive = userActive;
  await t.user.save();
  Object.assign(t, rest);
  await t.save();
  res.json(await Teacher.findById(t._id).populate('user classes subjects'));
}

export async function deleteTeacher(req, res) {
  const t = await Teacher.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  await User.findByIdAndDelete(t.user);
  await t.deleteOne();
  res.json({ ok: true });
}

export async function listClasses(req, res) {
  const items = await Class.find().populate('subjects').sort({ name: 1 });
  res.json(items);
}

export async function createClass(req, res) {
  const c = await Class.create(req.body);
  res.status(201).json(await c.populate('subjects'));
}

export async function updateClass(req, res) {
  const c = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
    'subjects'
  );
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json(c);
}

export async function deleteClass(req, res) {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

export async function listSubjects(req, res) {
  res.json(await Subject.find().sort({ name: 1 }));
}

export async function createSubject(req, res) {
  const s = await Subject.create(req.body);
  res.status(201).json(s);
}

export async function updateSubject(req, res) {
  const s = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
}

export async function deleteSubject(req, res) {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

export async function listAdmissions(req, res) {
  res.json(await Admission.find().sort({ createdAt: -1 }));
}

export async function updateAdmissionStatus(req, res) {
  const { status } = req.body;
  const a = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
}

export async function listNotices(req, res) {
  res.json(await Notice.find().populate('createdBy', 'name').sort({ createdAt: -1 }));
}

export async function createNotice(req, res) {
  const n = await Notice.create({ ...req.body, createdBy: req.user._id });
  try {
    const fsId = await syncNoticeToFirestore(n);
    if (fsId) {
      n.firestoreId = fsId;
      await n.save();
    }
  } catch (e) {
    console.error('Firestore sync', e.message);
  }
  res.status(201).json(n);
}

export async function updateNotice(req, res) {
  const n = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!n) return res.status(404).json({ message: 'Not found' });
  try {
    await syncNoticeToFirestore(n);
  } catch (e) {
    console.error(e);
  }
  res.json(n);
}

export async function deleteNotice(req, res) {
  const n = await Notice.findById(req.params.id);
  if (!n) return res.status(404).json({ message: 'Not found' });
  try {
    await deleteNoticeFromFirestore(n.firestoreId);
  } catch (e) {
    console.error(e);
  }
  await n.deleteOne();
  res.json({ ok: true });
}

export async function listEvents(req, res) {
  res.json(await Event.find().sort({ date: -1 }));
}

export async function createEvent(req, res) {
  const e = await Event.create(req.body);
  res.status(201).json(e);
}

export async function updateEvent(req, res) {
  const e = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!e) return res.status(404).json({ message: 'Not found' });
  res.json(e);
}

export async function deleteEvent(req, res) {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

export async function listSuggestions(req, res) {
  res.json(await Suggestion.find().sort({ createdAt: -1 }));
}

export async function updateSuggestionStatus(req, res) {
  const s = await Suggestion.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(s);
}

export async function feeReport(req, res) {
  const items = await Payment.find({ status: { $in: ['paid', 'dummy'] } })
    .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
    .sort({ paidAt: -1 })
    .limit(500);
  res.json(items);
}

export async function attendanceReport(req, res) {
  const { from, to, classId } = req.query;
  const filter = {};
  if (from) filter.date = { ...filter.date, $gte: new Date(from) };
  if (to) filter.date = { ...filter.date, $lte: new Date(to) };
  if (classId) filter.classRef = classId;
  const rows = await Attendance.find(filter)
    .populate({ path: 'student', populate: { path: 'user', select: 'name' } })
    .populate('classRef', 'name section')
    .sort({ date: -1 })
    .limit(1000);
  res.json(rows);
}

export async function studentsReport(req, res) {
  res.json(await Student.find().populate('user', 'name email').populate('class'));
}

export async function listFeedback(req, res) {
  res.json(
    await Feedback.find()
      .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
      .sort({ createdAt: -1 })
  );
}

export async function listNotesAdmin(req, res) {
  res.json(
    await Note.find()
      .populate('classRef subject uploadedBy')
      .sort({ createdAt: -1 })
      .limit(200)
  );
}

export const bulkAttendanceValidators = [
  body('classRef').notEmpty(),
  body('date').notEmpty(),
  body('entries').isArray({ min: 1 }),
];

export async function seedDemo(req, res) {
  if (process.env.ALLOW_SEED !== 'true') {
    return res.status(403).json({ message: 'Set ALLOW_SEED=true to enable' });
  }
  const subjects = await Subject.insertMany([
    { name: 'Marathi', code: 'MAR' },
    { name: 'English', code: 'ENG' },
    { name: 'Mathematics', code: 'MATH' },
  ]);
  const cls = await Class.create({
    name: 'Std 5',
    section: 'A',
    subjects: subjects.map((s) => s._id),
  });
  res.json({ subjects, class: cls });
}
