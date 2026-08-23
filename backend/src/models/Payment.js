const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  membershipPlan: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  screenshotUrl: { type: String, default: '' },
  paymentMethod: { type: String, default: 'qr' },
  transactionId: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
