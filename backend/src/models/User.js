const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['owner', 'trainer', 'member'], required: true },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },

  // Owner fields
  gymName: { type: String, default: '' },
  qrPayment: { type: String, default: '' },

  // Trainer fields
  specialty: { type: String, default: '' },
  assignedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  availability: { type: String, default: 'Mon-Sat 6AM-10PM' },
  rating: { type: Number, default: 0 },
  experience: { type: String, default: '' },
  certifications: [{ type: String }],

  // Member fields
  membershipPlan: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'annual', 'none'], default: 'none' },
  joinDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  trainerAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendanceCount: { type: Number, default: 0 },
  rewardPoints: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  fitnessGoal: { type: String, default: '' },
  progressImages: [{ type: String }],
  paymentStatus: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
  memberId: { type: String, unique: true, sparse: true },

  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
