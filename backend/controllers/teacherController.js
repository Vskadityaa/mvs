import multer from 'multer';
import Attendance from '../models/Attendance.js';
import Homework from '../models/Homework.js';
import Marks from '../models/Marks.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Note from '../models/Note.js';
import Notice from '../models/Notice.js';
import Notification from '../models/Notification.js';
import { uploadBufferToFirebase } from '../utils/uploadBuffer.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

export const uploadMiddleware = upload.single('file');

export async function myClasses(req, res) {
  const t = await Teacher.findOne({ user: req.user._id }).populate('classes subjects');
  if (!t) return res.status(404).json({ message: 'Teacher profile not found' });
  res.json(t);
}

export async function classStudents(req, res) {
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.params.classId)) {
    return res.status(403).json({ message: 'Not assigned to this class' });
  }
  const students = await Student.find({ class: req.params.classId }).populate(
    'user',
    'name email'
  );
  res.json(students);
}

export async function markAttendance(req, res) {
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.body.classRef)) {
    return res.status(403).json({ message: 'Not assigned to this class' });
  }
  const date = new Date(req.body.date);
  const entries = req.body.entries;
  const bulk = entries.map((e) => ({
    student: e.student,
    classRef: req.body.classRef,
    date,
    status: e.status || 'present',
    markedBy: req.user._id,
    remarks: e.remarks,
  }));
  for (const row of bulk) {
    await Attendance.findOneAndUpdate(
      { student: row.student, date: row.date, classRef: row.classRef },
      row,
      { upsert: true, new: true }
    );
  }
  res.json({ ok: true, count: bulk.length });
}

export async function listAttendanceForClass(req, res) {
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.params.classId)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const date = req.query.date ? new Date(req.query.date) : new Date();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const rows = await Attendance.find({
    classRef: req.params.classId,
    date: { $gte: start, $lte: end },
  }).populate({ path: 'student', populate: { path: 'user', select: 'name' } });
  res.json(rows);
}

export async function createHomework(req, res) {
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.body.classRef)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  let attachmentUrl;
  if (req.file) {
    attachmentUrl = await uploadBufferToFirebase(
      'homework',
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );
  }
  const hw = await Homework.create({
    ...req.body,
    attachmentUrl,
    createdBy: req.user._id,
  });
  const students = await Student.find({ class: req.body.classRef });
  for (const s of students) {
    await Notification.create({
      user: s.user,
      title: 'New homework',
      body: req.body.title,
    });
  }
  res.status(201).json(hw);
}

export async function uploadNote(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'file required' });
  }
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.body.classRef)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const url = await uploadBufferToFirebase(
    'notes',
    req.file.originalname,
    req.file.buffer,
    req.file.mimetype
  );
  const note = await Note.create({
    title: req.body.title,
    classRef: req.body.classRef,
    subject: req.body.subject || undefined,
    fileUrl: url,
    fileName: req.file.originalname,
    uploadedBy: req.user._id,
  });
  const students = await Student.find({ class: req.body.classRef });
  for (const s of students) {
    await Notification.create({
      user: s.user,
      title: 'New study note',
      body: req.body.title,
    });
  }
  res.status(201).json(note);
}

export async function enterMarks(req, res) {
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t?.classes?.map(String).includes(req.body.classRef)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const doc = await Marks.findOneAndUpdate(
    {
      student: req.body.student,
      subject: req.body.subject,
      examName: req.body.examName,
      classRef: req.body.classRef,
    },
    {
      maxMarks: req.body.maxMarks ?? 100,
      obtained: req.body.obtained,
      enteredBy: req.user._id,
    },
    { upsert: true, new: true }
  );
  const stu = await Student.findById(req.body.student);
  if (stu?.user) {
    await Notification.create({
      user: stu.user,
      title: 'Marks updated',
      body: `${req.body.examName} — ${req.body.obtained}/${doc.maxMarks}`,
    });
  }
  res.json(doc);
}

export async function teacherAnnouncements(req, res) {
  const notices = await Notice.find({
    audience: { $in: ['all', 'teachers'] },
  })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(notices);
}

export async function updateTeacherProfilePhoto(req, res) {
  if (!req.file) return res.status(400).json({ message: 'file required' });
  const t = await Teacher.findOne({ user: req.user._id });
  if (!t) return res.status(404).json({ message: 'Teacher not found' });
  const url = await uploadBufferToFirebase(
    'teachers',
    req.file.originalname,
    req.file.buffer,
    req.file.mimetype
  );
  t.photoUrl = url;
  await t.save();
  res.json(t);
}
