const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /members - Get all members (owner/trainer)
router.get('/', protect, authorize('owner', 'trainer'), async (req, res) => {
  try {
    const { search, plan, status, page = 1, limit = 20 } = req.query;
    let query = { role: 'member' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { memberId: { $regex: search, $options: 'i' } },
      ];
    }
    if (plan && plan !== 'all') query.membershipPlan = plan;
    if (status === 'active') query.paymentStatus = 'paid';
    if (status === 'inactive') query.paymentStatus = { $ne: 'paid' };

    const total = await User.countDocuments(query);
    const members = await User.find(query)
      .select('-password')
      .populate('trainerAssigned', 'name specialty')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, members, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /members/:id - Get member by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const member = await User.findById(req.params.id)
      .select('-password')
      .populate('trainerAssigned', 'name specialty rating');
    if (!member || member.role !== 'member') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /members - Add new member (owner only)
router.post('/', protect, authorize('owner'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const memberData = {
      ...req.body,
      role: 'member',
      memberId: `EF-${Date.now().toString().slice(-6)}`,
    };

    const expiry = new Date();
    const plans = { monthly: 1, quarterly: 3, 'half-yearly': 6, annual: 12 };
    expiry.setMonth(expiry.getMonth() + (plans[req.body.membershipPlan] || 1));
    memberData.expiryDate = expiry;

    const member = await User.create(memberData);
    res.status(201).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /members/:id - Update member
router.put('/:id', protect, authorize('owner'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.password;

    const member = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password');
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /members/:id - Delete member
router.delete('/:id', protect, authorize('owner'), async (req, res) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /members/:id/assign-trainer - Assign trainer to member
router.put('/:id/assign-trainer', protect, authorize('owner'), async (req, res) => {
  try {
    const { trainerId } = req.body;
    const member = await User.findByIdAndUpdate(
      req.params.id,
      { trainerAssigned: trainerId },
      { new: true }
    ).select('-password');

    if (trainerId) {
      await User.findByIdAndUpdate(trainerId, { $addToSet: { assignedMembers: req.params.id } });
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
