const express = require('express');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// POST /payments - Create payment
router.post('/', protect, async (req, res) => {
  try {
    const { amount, membershipPlan, screenshotUrl, notes } = req.body;
    const memberId = req.user.role === 'member' ? req.user._id : req.body.memberId;

    const payment = await Payment.create({
      member: memberId,
      amount,
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /payments/member/:id - Get member payments
router.get('/member/:id', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ member: req.params.id }).sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /payments - Get all payments (owner)
router.get('/', protect, authorize('owner'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('member', 'name email memberId membershipPlan')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, payments, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /payments/:id/verify - Verify payment (owner)
router.put('/:id/verify', protect, authorize('owner'), async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });

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
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
