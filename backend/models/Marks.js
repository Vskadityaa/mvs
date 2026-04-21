import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    examName: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
    obtained: { type: Number, required: true },
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

marksSchema.index({ student: 1, subject: 1, examName: 1, classRef: 1 }, { unique: true });

export default mongoose.model('Marks', marksSchema);
