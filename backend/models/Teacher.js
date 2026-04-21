import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    qualification: { type: String },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String },
    photoUrl: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    displayOnWebsite: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Teacher', teacherSchema);
