import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    aim: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    maxMembers: { type: Number, required: true, min: 2 },
    membersCount: { type: Number, default: 1, min: 0 },
    skills: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

export default mongoose.model('Team', TeamSchema);


