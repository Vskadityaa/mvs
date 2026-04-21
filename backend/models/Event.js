import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    venue: { type: String },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
