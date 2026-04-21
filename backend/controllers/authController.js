import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import { getFirebase } from '../config/firebase.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import { signToken } from '../utils/token.js';

export const registerValidators = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 characters'),
  body('role').isIn(['admin', 'teacher', 'student']).withMessage('Invalid role'),
];

export const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hash, role });

  if (role === 'student') {
    await Student.create({ user: user._id, admissionStatus: 'approved' });
  } else if (role === 'teacher') {
    await Teacher.create({ user: user._id });
  }

  const token = signToken(user._id, user.role);
  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (!user.isActive) {
    return res.status(403).json({ message: 'Account disabled' });
  }
  const token = signToken(user._id, user.role);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function firebaseLogin(req, res) {
  const fb = getFirebase();
  if (!fb) {
    return res.status(503).json({ message: 'Firebase auth not configured on server' });
  }
  const { idToken, role: requestedRole } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: 'idToken required' });
  }
  const decoded = await fb.auth().verifyIdToken(idToken);
  const email = decoded.email;
  if (!email) {
    return res.status(400).json({ message: 'Email required from provider' });
  }

  let user = await User.findOne({ firebaseUid: decoded.uid });
  if (!user) {
    user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      user.firebaseUid = decoded.uid;
      await user.save();
    } else {
      const finalRole = requestedRole && ['admin', 'teacher', 'student'].includes(requestedRole)
        ? requestedRole
        : 'student';
      user = await User.create({
        name: decoded.name || email.split('@')[0],
        email: email.toLowerCase(),
        role: finalRole,
        firebaseUid: decoded.uid,
      });
      if (finalRole === 'student') {
        await Student.create({ user: user._id, admissionStatus: 'approved' });
      } else if (finalRole === 'teacher') {
        await Teacher.create({ user: user._id });
      }
    }
  }

  if (!user.isActive) {
    return res.status(403).json({ message: 'Account disabled' });
  }

  const token = signToken(user._id, user.role);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function me(req, res) {
  const user = await User.findById(req.user._id);
  let profile = null;
  if (user.role === 'student') {
    profile = await Student.findOne({ user: user._id }).populate('class');
  } else if (user.role === 'teacher') {
    profile = await Teacher.findOne({ user: user._id }).populate('classes subjects');
  }
  return res.json({ user, profile });
}
