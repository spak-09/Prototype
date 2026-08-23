const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rewardPoints: { type: Number, default: 100 },
  maxParticipants: { type: Number, default: 50 },
  participants: [participantSchema],
  isActive: { type: Boolean, default: true },
  goalType: { type: String, default: 'completion' },
  goalTarget: { type: Number, default: 30 },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
