import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    section: { type: String, default: '' },
    academicYear: { type: String, default: '2025-26' },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  },
  { timestamps: true }
);

classSchema.index({ name: 1, section: 1 }, { unique: true });

export default mongoose.model('Class', classSchema);
