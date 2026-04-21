import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    applyingClass: { type: String, required: true },
    previousSchool: { type: String },
    message: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('Admission', admissionSchema);
