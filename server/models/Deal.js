import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Email',
    required: true
  },
  gmailId: String,
  from: String,
  subject: String,
  category: {
    type: String,
    enum: ['GOOD_DEAL', 'BAD_DEAL', 'NOT_A_DEAL'],
    required: true
  },
  reasoning: String,
  confidence: Number,
  tags: [String],
  notes: String,
  isNoteworthy: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Deal', dealSchema);
