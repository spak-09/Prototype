const express = require('express');
const mongoose = require('mongoose');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const canAccessMember = (req, member) => {
  if (!member) return false;
  if (req.user.role === 'owner') return true;
  if (req.user.role === 'member') {
    return member._id.toString() === req.user._id.toString();
  }
  return req.user.role === 'trainer' && member.trainerAssigned && member.trainerAssigned.toString() === req.user._id.toString();
};

const resolveTargetMember = async (req) => {
  if (req.user.role === 'member') {
    return User.findOne({ _id: req.user._id, role: 'member' });
  }

  if (!req.body.memberId || !mongoose.isValidObjectId(req.body.memberId)) {
    return null;
  }

  return User.findOne({ _id: req.body.memberId, role: 'member' });
};

// POST /attendance/checkin
router.post('/checkin', protect, async (req, res) => {
  try {
    const member = await resolveTargetMember(req);
    if (!member || !canAccessMember(req, member)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const memberId = member._id;
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
    res.status(500).json({ success: false, message: 'Unable to check in member' });
  }
});

// POST /attendance/checkout
router.post('/checkout', protect, async (req, res) => {
  try {
    const member = await resolveTargetMember(req);
    if (!member || !canAccessMember(req, member)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const memberId = member._id;
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
    res.status(500).json({ success: false, message: 'Unable to check out member' });
  }
});

// GET /attendance/member/:id
router.get('/member/:id', protect, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const member = await User.findOne({ _id: req.params.id, role: 'member' }).select('trainerAssigned');
    if (!member || !canAccessMember(req, member)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const { startDate, endDate } = req.query;
    const query = { member: member._id };

    if (startDate || endDate) {
      const dateFilter = {};
      if (startDate) {
        const parsedStart = new Date(startDate);
        if (Number.isNaN(parsedStart.getTime())) {
          return res.status(400).json({ success: false, message: 'Invalid start date' });
        }
        dateFilter.$gte = parsedStart;
      }
      if (endDate) {
        const parsedEnd = new Date(endDate);
        if (Number.isNaN(parsedEnd.getTime())) {
          return res.status(400).json({ success: false, message: 'Invalid end date' });
        }
        dateFilter.$lte = parsedEnd;
      }
      query.date = dateFilter;
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch attendance' });
  }
});

// GET /attendance/today - Get today's attendance (owner/trainer)
router.get('/today', protect, authorize('owner', 'trainer'), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const query = { date: { $gte: today, $lt: tomorrow } };
    if (req.user.role === 'trainer') {
      const assignedMembers = await User.find({ trainerAssigned: req.user._id, role: 'member' }).select('_id');
      query.member = { $in: assignedMembers.map((member) => member._id) };
    }

    const attendance = await Attendance.find(query).populate('member', 'name email memberId');

    res.json({ success: true, attendance, count: attendance.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch today\'s attendance' });
  }
});

module.exports = router;
