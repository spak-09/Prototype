const express = require('express');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const Workout = require('../models/Workout');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /analytics/dashboard - Owner dashboard analytics
router.get('/dashboard', protect, authorize('owner'), async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({ role: 'member' });
    const activeMembers = await User.countDocuments({ role: 'member', paymentStatus: 'paid' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.countDocuments({ date: { $gte: today } });

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyPayments = await Payment.aggregate([
      { $match: { date: { $gte: startOfMonth }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const activeTrainers = await User.countDocuments({ role: 'trainer', isActive: true });

    // Renewals due in next 7 days
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const renewalsDue = await User.countDocuments({
      role: 'member',
      expiryDate: { $gte: today, $lte: nextWeek },
    });

    // Revenue trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const revenueTrend = await Payment.aggregate([
      { $match: { date: { $gte: sixMonthsAgo }, status: 'completed' } },
      { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' } }, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Membership distribution
    const membershipDist = await User.aggregate([
      { $match: { role: 'member' } },
      { $group: { _id: '$membershipPlan', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      dashboard: {
        totalMembers,
        activeMembers,
        revenueThisMonth: monthlyPayments[0]?.total || 0,
        attendanceToday: todayAttendance,
        renewalsDue,
        activeTrainers,
        revenueTrend,
        membershipDistribution: membershipDist,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /analytics/attendance - Attendance analytics
router.get('/attendance', protect, authorize('owner'), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Weekly attendance
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyAttendance = await Attendance.aggregate([
      { $match: { date: { $gte: weekAgo } } },
      { $group: { _id: { $dayOfWeek: '$date' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ]);

    // Monthly attendance
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthlyAttendance = await Attendance.aggregate([
      { $match: { date: { $gte: monthAgo } } },
      { $group: { _id: { $dayOfMonth: '$date' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ]);

    // Peak hours
    const peakHours = await Attendance.aggregate([
      { $group: { _id: { $hour: '$checkInTime' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      weeklyAttendance,
      monthlyAttendance,
      peakHours,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
