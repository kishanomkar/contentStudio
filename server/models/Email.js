import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gmailId: {
    type: String,
    required: true
  },
  from: String,
  to: String,
  subject: String,
  body: String,
  plainText: String,
  receivedAt: Date,
  isDeal: Boolean,
  dealCategory: {
    type: String,
    enum: ['GOOD_DEAL', 'BAD_DEAL', 'NOT_A_DEAL', 'PENDING'],
    default: 'PENDING'
  },
  dealAnalysis: {
    reasoning: String,
    confidence: Number,
    tags: [String]
  },
  isAnalyzed: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

emailSchema.index({ userId: 1, gmailId: 1 }, { unique: true });

export default mongoose.model('Email', emailSchema);
