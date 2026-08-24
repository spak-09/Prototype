const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, protect, authorize } = require('../middleware/auth');

const router = express.Router();

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return false;
  }
  return true;
};

const createUser = async ({ name, email, password, role, phone, gymName, specialty, membershipPlan }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('User already exists with this email');
    error.statusCode = 400;
    throw error;
  }

  const userData = { name, email: normalizedEmail, password, role, phone };

  if (role === 'owner') userData.gymName = gymName || '';
  if (role === 'trainer') userData.specialty = specialty || '';
  if (role === 'member') {
    userData.membershipPlan = membershipPlan || 'monthly';
    userData.memberId = `EF-${Date.now().toString().slice(-6)}`;
    const expiry = new Date();
    const plans = { monthly: 1, quarterly: 3, 'half-yearly': 6, annual: 12 };
    expiry.setMonth(expiry.getMonth() + (plans[userData.membershipPlan] || 1));
    userData.expiryDate = expiry;
  }

  return User.create(userData);
};

// POST /auth/register
// Public registration always creates a member. Privileged accounts must be created by an owner.
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], async (req, res) => {
  try {
    if (!validateRequest(req, res)) return;

    const { name, email, password, phone, membershipPlan } = req.body;
    const user = await createUser({
      name,
      email,
      password,
      phone,
      membershipPlan,
      role: 'member',
    });

    const token = generateToken(user._id);
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    const statusCode = error.statusCode || (error.code === 11000 ? 400 : 500);
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Unable to create account' : error.message,
    });
  }
});

// POST /auth/staff
// Owner-only endpoint for creating trainer/owner accounts.
router.post('/staff', protect, authorize('owner'), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').isIn(['owner', 'trainer']).withMessage('Staff role must be owner or trainer'),
], async (req, res) => {
  try {
    if (!validateRequest(req, res)) return;

    const { name, email, password, role, phone, gymName, specialty } = req.body;
    const user = await createUser({ name, email, password, role, phone, gymName, specialty });

    res.status(201).json({ success: true, user });
  } catch (error) {
    const statusCode = error.statusCode || (error.code === 11000 ? 400 : 500);
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Unable to create staff account' : error.message,
    });
  }
});

// POST /auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    if (!validateRequest(req, res)) return;

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is inactive' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to process login' });
  }
});

// GET /auth/me
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// POST /auth/logout
router.post('/logout', protect, async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
