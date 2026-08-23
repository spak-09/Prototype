const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');

const router = express.Router();

// POST /auth/register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['owner', 'trainer', 'member']).withMessage('Valid role is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, role, phone, gymName, specialty, membershipPlan } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const userData = { name, email, password, role, phone };
    if (role === 'owner') userData.gymName = gymName || '';
    if (role === 'trainer') userData.specialty = specialty || '';
    if (role === 'member') {
      userData.membershipPlan = membershipPlan || 'monthly';
      userData.memberId = `EF-${Date.now().toString().slice(-6)}`;
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);
      userData.expiryDate = expiry;
    }

    const user = await User.create(userData);
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
