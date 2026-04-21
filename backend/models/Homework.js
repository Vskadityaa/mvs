import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    classRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    dueDate: { type: Date },
    attachmentUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Homework', homeworkSchema);
