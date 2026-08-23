const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
}, { timestamps: true });

attendanceSchema.index({ member: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
