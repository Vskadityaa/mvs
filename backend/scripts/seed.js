import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';

async function run() {
  await connectDB();
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@school.edu';
  const adminPass = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const hash = await bcrypt.hash(adminPass, 12);
    admin = await User.create({
      name: 'Principal Admin',
      email: adminEmail,
      password: hash,
      role: 'admin',
    });
    console.log('Created admin:', adminEmail, '/', adminPass);
  } else {
    console.log('Admin already exists:', adminEmail);
  }

  const subCount = await Subject.countDocuments();
  if (subCount === 0) {
    const subs = await Subject.insertMany([
      { name: 'Marathi', code: 'MAR' },
      { name: 'English', code: 'ENG' },
      { name: 'Mathematics', code: 'MATH' },
      { name: 'Science', code: 'SCI' },
    ]);
    const cls = await Class.create({
      name: 'Std 5',
      section: 'A',
      subjects: subs.map((s) => s._id),
    });
    console.log('Seeded class', cls.name, cls.section);
  }

  const teacherEmail = process.env.SEED_TEACHER_EMAIL || 'teacher@school.edu';
  let tUser = await User.findOne({ email: teacherEmail });
  if (!tUser) {
    const hash = await bcrypt.hash(process.env.SEED_TEACHER_PASSWORD || 'Teacher@123', 12);
    tUser = await User.create({
      name: 'Demo Teacher',
      email: teacherEmail,
      password: hash,
      role: 'teacher',
    });
    const cls = await Class.findOne({ name: 'Std 5', section: 'A' });
    await Teacher.create({
      user: tUser._id,
      qualification: 'M.Ed',
      experienceYears: 8,
      bio: 'Mathematics & Science',
      classes: cls ? [cls._id] : [],
      subjects: cls?.subjects || [],
      displayOnWebsite: true,
    });
    console.log('Created teacher:', teacherEmail);
  }

  const studentEmail = process.env.SEED_STUDENT_EMAIL || 'student@school.edu';
  let sUser = await User.findOne({ email: studentEmail });
  if (!sUser) {
    const hash = await bcrypt.hash(process.env.SEED_STUDENT_PASSWORD || 'Student@123', 12);
    sUser = await User.create({
      name: 'Demo Student',
      email: studentEmail,
      password: hash,
      role: 'student',
    });
    const cls = await Class.findOne({ name: 'Std 5', section: 'A' });
    await Student.create({
      user: sUser._id,
      rollNo: '101',
      admissionNo: 'ADM-2025-001',
      class: cls?._id,
      admissionStatus: 'approved',
    });
    console.log('Created student:', studentEmail);
  }

  await mongoose.disconnect();
  console.log('Seed complete');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
