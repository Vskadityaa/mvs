import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    message: { type: String, required: true },
    category: { type: String, enum: ['general', 'academic', 'infra'], default: 'general' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
