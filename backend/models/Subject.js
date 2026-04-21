import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
  },
  { timestamps: true }
);

subjectSchema.index({ name: 1, code: 1 }, { unique: true, sparse: true });

export default mongoose.model('Subject', subjectSchema);
