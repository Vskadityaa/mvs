import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Student from '../models/Student.js';
import Notification from '../models/Notification.js';

function getRazorpay() {
  const key = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key || !secret) return null;
  return new Razorpay({ key_id: key, key_secret: secret });
}

export async function createOrder(req, res) {
  const { amount, purpose } = req.body;
  const amt = Number(amount);
  if (!amt || amt < 1) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    return res.status(400).json({ message: 'Student profile not found' });
  }

  const rp = getRazorpay();
  if (!rp) {
    const payment = await Payment.create({
      student: student._id,
      amount: amt,
      purpose: purpose || 'Tuition Fee',
      status: 'dummy',
      paidAt: new Date(),
      meta: { mode: 'dummy_fallback' },
    });
    await Notification.create({
      user: req.user._id,
      title: 'Fee payment (demo)',
      body: `Recorded dummy payment of ₹${amt}`,
    });
    return res.json({
      mode: 'dummy',
      paymentId: payment._id,
      message: 'Razorpay not configured — demo payment recorded',
    });
  }

  const order = await rp.orders.create({
    amount: Math.round(amt * 100),
    currency: 'INR',
    receipt: `rcpt_${student._id}_${Date.now()}`,
    notes: { studentId: String(student._id), userId: String(req.user._id) },
  });

  const payment = await Payment.create({
    student: student._id,
    amount: amt,
    purpose: purpose || 'Tuition Fee',
    status: 'pending',
    razorpayOrderId: order.id,
    meta: { order },
  });

  return res.json({
    mode: 'razorpay',
    key: process.env.RAZORPAY_KEY_ID,
    order,
    paymentId: payment._id,
  });
}

export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;
  const rp = getRazorpay();

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return res.status(404).json({ message: 'Payment record not found' });
  }

  if (!rp) {
    return res.status(400).json({ message: 'Razorpay not configured' });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected !== razorpay_signature) {
    payment.status = 'failed';
    await payment.save();
    return res.status(400).json({ message: 'Invalid signature' });
  }

  payment.status = 'paid';
  payment.razorpayPaymentId = razorpay_payment_id;
  payment.razorpaySignature = razorpay_signature;
  payment.paidAt = new Date();
  await payment.save();

  const student = await Student.findById(payment.student);
  if (student?.user) {
    await Notification.create({
      user: student.user,
      title: 'Payment successful',
      body: `₹${payment.amount} paid for ${payment.purpose}`,
    });
  }

  return res.json({ success: true, payment });
}

export async function listMyPayments(req, res) {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) return res.json([]);
  const items = await Payment.find({ student: student._id }).sort({ createdAt: -1 });
  res.json(items);
}

export async function adminListPayments(req, res) {
  const items = await Payment.find()
    .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
    .sort({ createdAt: -1 })
    .limit(200);
  res.json(items);
}
