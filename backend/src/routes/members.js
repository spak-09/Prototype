const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const PLAN_VALUES = ['monthly', 'quarterly', 'half-yearly', 'annual', 'none'];
const STATUS_VALUES = ['all', 'active', 'inactive'];
const MAX_SEARCH_LENGTH = 100;
const MAX_PAGE_SIZE = 100;

const CREATE_MEMBER_FIELDS = [
  'name',
  'email',
  'password',
  'phone',
  'avatar',
  'membershipPlan',
  'joinDate',
  'height',
  'weight',
  'fitnessGoal',
  'progressImages',
];

const UPDATE_MEMBER_FIELDS = [
  'name',
  'email',
  'phone',
  'avatar',
  'membershipPlan',
  'joinDate',
  'height',
  'weight',
  'fitnessGoal',
  'progressImages',
  'isActive',
];

const pickAllowedFields = (body, allowedFields) => {
  return Object.fromEntries(
    allowedFields
      .filter((field) => Object.prototype.hasOwnProperty.call(body, field))
      .map((field) => [field, body[field]])
  );
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isAssignedTrainer = (member, trainerId) => (
  member.trainerAssigned && member.trainerAssigned.toString() === trainerId.toString()
);

// GET /members - Get all members (owner/trainer)
router.get('/', protect, authorize('owner', 'trainer'), async (req, res) => {
  try {
    const { search, plan, status, page = '1', limit = '20' } = req.query;

    if (search !== undefined && typeof search !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid search parameter' });
    }
    if (plan !== undefined && typeof plan !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid plan parameter' });
    }
    if (status !== undefined && typeof status !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid status parameter' });
    }
    if (typeof page !== 'string' || !/^\d+$/.test(page) || Number(page) < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page parameter' });
    }
    if (typeof limit !== 'string' || !/^\d+$/.test(limit) || Number(limit) < 1 || Number(limit) > MAX_PAGE_SIZE) {
      return res.status(400).json({ success: false, message: `Limit must be between 1 and ${MAX_PAGE_SIZE}` });
    }
    if (plan && !PLAN_VALUES.includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid membership plan' });
    }
    if (status && !STATUS_VALUES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status parameter' });
    }
    if (search && search.length > MAX_SEARCH_LENGTH) {
      return res.status(400).json({ success: false, message: 'Search query is too long' });
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    let query = { role: 'member' };

    if (search) {
      const safeSearch = escapeRegex(search.trim());
      query.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { email: { $regex: safeSearch, $options: 'i' } },
        { memberId: { $regex: safeSearch, $options: 'i' } },
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
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({ success: true, members, total, page: pageNumber, pages: Math.ceil(total / limitNumber) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch members' });
  }
});

// GET /members/:id - Get a member only when the caller is allowed to see them.
router.get('/:id', protect, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const member = await User.findById(req.params.id)
      .select('-password')
      .populate('trainerAssigned', 'name specialty rating');

    if (!member || member.role !== 'member') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const isOwner = req.user.role === 'owner';
    const isSelf = req.user.role === 'member' && req.user._id.toString() === member._id.toString();
    const isAssignedTrainer = req.user.role === 'trainer' && isAssignedTrainer(member, req.user._id);

    if (!isOwner && !isSelf && !isAssignedTrainer) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch member' });
  }
});

// POST /members - Add new member (owner only)
router.post('/', protect, authorize('owner'), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('membershipPlan').optional().isIn(PLAN_VALUES.filter((plan) => plan !== 'none')).withMessage('Invalid membership plan'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const memberData = pickAllowedFields(req.body, CREATE_MEMBER_FIELDS);
    memberData.role = 'member';
    memberData.memberId = `EF-${Date.now().toString().slice(-6)}`;

    const expiry = new Date();
    const plans = { monthly: 1, quarterly: 3, 'half-yearly': 6, annual: 12 };
    expiry.setMonth(expiry.getMonth() + (plans[memberData.membershipPlan] || 1));
    memberData.expiryDate = expiry;

    const member = await User.create(memberData);
    res.status(201).json({ success: true, member });
  } catch (error) {
    const statusCode = error.code === 11000 ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: statusCode === 400 ? 'Duplicate field value entered' : 'Unable to create member',
    });
  }
});

// PUT /members/:id - Update member (owner only)
router.put('/:id', protect, authorize('owner'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    if (req.body.membershipPlan !== undefined && !PLAN_VALUES.includes(req.body.membershipPlan)) {
      return res.status(400).json({ success: false, message: 'Invalid membership plan' });
    }
    if (req.body.email !== undefined && (typeof req.body.email !== 'string' || !/^\S+@\S+\.\S+$/.test(req.body.email))) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }

    const updateData = pickAllowedFields(req.body, UPDATE_MEMBER_FIELDS);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'No editable member fields supplied' });
    }

    if (updateData.email) updateData.email = updateData.email.toLowerCase().trim();

    const member = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'member' },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update member' });
  }
});

// DELETE /members/:id - Delete member
router.delete('/:id', protect, authorize('owner'), async (req, res) => {
  try {
    const member = await User.findOneAndDelete({ _id: req.params.id, role: 'member' });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete member' });
  }
});

// PUT /members/:id/assign-trainer - Assign trainer to member
router.put('/:id/assign-trainer', protect, authorize('owner'), async (req, res) => {
  try {
    const { trainerId } = req.body;
    const member = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'member' },
      { trainerAssigned: trainerId || null },
      { new: true }
    ).select('-password');

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    if (trainerId) {
      await User.findOneAndUpdate(
        { _id: trainerId, role: 'trainer' },
        { $addToSet: { assignedMembers: req.params.id } }
      );
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to assign trainer' });
  }
});

module.exports = router;
