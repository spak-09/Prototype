const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /leaderboard - Get leaderboard
router.get('/', protect, async (req, res) => {
  try {
    const { period = 'all' } = req.query;
    let query = { role: 'member' };

    const leaderboard = await User.find(query)
      .select('name avatar rewardPoints streak attendanceCount fitnessGoal memberId')
      .sort({ rewardPoints: -1 })
      .limit(20);

    res.json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
