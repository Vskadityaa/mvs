import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admissionNo: { type: String, unique: true, sparse: true },
    rollNo: { type: String },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    parentName: { type: String },
    parentPhone: { type: String },
    address: { type: String },
    dob: { type: Date },
    documents: [{ name: String, url: String, uploadedAt: Date }],
    admissionStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
