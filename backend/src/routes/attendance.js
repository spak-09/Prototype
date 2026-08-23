const express = require('express');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// POST /attendance/checkin
router.post('/checkin', protect, async (req, res) => {
  try {
    const memberId = req.user.role === 'member' ? req.user._id : req.body.memberId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({ member: memberId, date: { $gte: today } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already checked in today' });
    }

    const attendance = await Attendance.create({ member: memberId, checkInTime: new Date() });
    await User.findByIdAndUpdate(memberId, { $inc: { attendanceCount: 1, streak: 1, rewardPoints: 5 } });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /attendance/checkout
router.post('/checkout', protect, async (req, res) => {
  try {
    const memberId = req.user.role === 'member' ? req.user._id : req.body.memberId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { member: memberId, date: { $gte: today } },
      { checkOutTime: new Date() },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ success: false, message: 'No check-in found for today' });
    }

    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /attendance/member/:id
router.get('/member/:id', protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { member: req.params.id };

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /attendance/today - Get today's attendance (owner)
router.get('/today', protect, authorize('owner', 'trainer'), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    }).populate('member', 'name email memberId');

    res.json({ success: true, attendance, count: attendance.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
