const express = require('express');
const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const PLANS = ['monthly', 'quarterly', 'half-yearly', 'annual'];

// POST /payments - Create payment
router.post('/', protect, async (req, res) => {
  try {
    const { amount, membershipPlan, screenshotUrl, notes } = req.body;

    if (!PLANS.includes(membershipPlan)) {
      return res.status(400).json({ success: false, message: 'Invalid membership plan' });
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount' });
    }

    let memberId;

    if (req.user.role === 'member') {
      memberId = req.user._id;
    } else if (req.user.role === 'owner') {
      if (!req.body.memberId || !mongoose.isValidObjectId(req.body.memberId)) {
        return res.status(400).json({ success: false, message: 'Valid memberId is required' });
      }

      const member = await User.findOne({ _id: req.body.memberId, role: 'member' }).select('_id');
      if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
      }
      memberId = member._id;
    } else {
      return res.status(403).json({ success: false, message: 'Trainers are not authorized to create payments' });
    }

    const payment = await Payment.create({
      member: memberId,
      amount: parsedAmount,
      membershipPlan,
      screenshotUrl: screenshotUrl || '',
      notes: notes || '',
      transactionId: `TXN-${Date.now()}`,
      status: req.user.role === 'owner' ? 'completed' : 'pending',
    });

    if (req.user.role === 'member') {
      await User.findByIdAndUpdate(memberId, { paymentStatus: 'pending' });
    }

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to create payment' });
  }
});

// GET /payments/member/:id - Get member payments
router.get('/member/:id', protect, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const member = await User.findOne({ _id: req.params.id, role: 'member' }).select('trainerAssigned');
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const isOwner = req.user.role === 'owner';
    const isSelf = req.user.role === 'member' && req.user._id.toString() === member._id.toString();
    const isAssignedTrainer = req.user.role === 'trainer' && member.trainerAssigned && member.trainerAssigned.toString() === req.user._id.toString();

    if (!isOwner && !isSelf && !isAssignedTrainer) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const payments = await Payment.find({ member: member._id }).sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch member payments' });
  }
});

// GET /payments - Get all payments (owner)
router.get('/', protect, authorize('owner'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const allowedStatuses = ['all', 'pending', 'completed', 'failed', 'refunded'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status' });
    }

    const pageNumber = Math.max(Number.parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(Number.parseInt(limit, 10) || 20, 1), 100);
    const query = {};
    if (status && status !== 'all') query.status = status;

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('member', 'name email memberId membershipPlan')
      .sort({ date: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({ success: true, payments, total, page: pageNumber, pages: Math.ceil(total / limitNumber) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch payments' });
  }
});

// PUT /payments/:id/verify - Verify payment (owner)
router.put('/:id/verify', protect, authorize('owner'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    const allowedStatuses = ['pending', 'completed', 'failed', 'refunded'];
    const { status } = req.body;
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status' });
    }

    const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (status === 'completed') {
      const plans = { monthly: 1, quarterly: 3, 'half-yearly': 6, annual: 12 };
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + (plans[payment.membershipPlan] || 1));

      await User.findByIdAndUpdate(payment.member, {
        paymentStatus: 'paid',
        membershipPlan: payment.membershipPlan,
        expiryDate: expiry,
      });
    }

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to verify payment' });
  }
});

module.exports = router;
