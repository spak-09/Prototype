const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, default: 3 },
  reps: { type: Number, default: 10 },
  weight: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  restTime: { type: Number, default: 60 },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  exercises: [exerciseSchema],
  assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
