const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Attendance = require('../models/Attendance');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /trainer/dashboard - Trainer dashboard stats
router.get('/dashboard', protect, authorize('trainer'), async (req, res) => {
  try {
    const trainer = await User.findById(req.user._id);
    const assignedMembers = await User.find({ trainerAssigned: req.user._id }).select('-password');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.countDocuments({
      member: { $in: trainer.assignedMembers },
      date: { $gte: today },
    });

    const pendingWorkouts = await Workout.countDocuments({
      assignedTrainer: req.user._id,
      isPublished: false,
    });

    res.json({
      success: true,
      dashboard: {
        assignedMembers: assignedMembers.length,
        todaySessions: todayAttendance,
        pendingPlans: pendingWorkouts,
        attendanceToday: todayAttendance,
        members: assignedMembers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /trainer/members - Get trainer's assigned members
router.get('/members', protect, authorize('trainer'), async (req, res) => {
  try {
    const members = await User.find({ trainerAssigned: req.user._id })
      .select('-password')
      .populate('trainerAssigned', 'name specialty');
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /trainer/workout - Create workout plan
router.post('/workout', protect, authorize('trainer'), async (req, res) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      assignedTrainer: req.user._id,
    });
    res.status(201).json({ success: true, workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /trainer/workouts - Get trainer's workouts
router.get('/workouts', protect, authorize('trainer'), async (req, res) => {
  try {
    const workouts = await Workout.find({ assignedTrainer: req.user._id })
      .populate('assignedMembers', 'name memberId')
      .sort({ createdAt: -1 });
    res.json({ success: true, workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /trainer/member/:id/progress - Update assigned member progress
router.put('/member/:id/progress', protect, authorize('trainer'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const { weight, height } = req.body;
    const updateData = {};
    if (weight !== undefined) updateData.weight = weight;
    if (height !== undefined) updateData.height = height;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'No progress fields supplied' });
    }

    // Authorization is enforced in the database query itself: the trainer may only
    // update a member whose trainerAssigned field points to the authenticated trainer.
    const member = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'member', trainerAssigned: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update member progress' });
  }
});

module.exports = router;
