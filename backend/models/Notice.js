import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
    audience: { type: String, enum: ['all', 'teachers', 'students'], default: 'all' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firestoreId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);
