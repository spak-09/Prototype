const express = require('express');
const CommunityPost = require('../models/CommunityPost');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const CHALLENGE_FIELDS = [
  'title',
  'description',
  'startDate',
  'endDate',
  'rewardPoints',
  'maxParticipants',
  'isActive',
  'goalType',
  'goalTarget',
];

const pickChallengeFields = (body) => Object.fromEntries(
  CHALLENGE_FIELDS
    .filter((field) => Object.prototype.hasOwnProperty.call(body, field))
    .map((field) => [field, body[field]])
);

// GET /posts - Get all community posts
router.get('/posts', protect, async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate('author', 'name avatar role')
      .populate('comments.author', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /posts - Create a post
router.post('/posts', protect, async (req, res) => {
  try {
    const post = await CommunityPost.create({
      author: req.user._id,
      caption: req.body.caption,
      image: req.body.image || '',
      type: req.body.type || 'post',
    });
    const populated = await post.populate('author', 'name avatar role');
    res.status(201).json({ success: true, post: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /posts/:id/like - Like/unlike a post
router.post('/posts/:id/like', protect, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /posts/:id/comment - Comment on a post
router.post('/posts/:id/comment', protect, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.comments.push({ author: req.user._id, text: req.body.text });
    await post.save();
    const populated = await post.populate('comments.author', 'name avatar');
    res.json({ success: true, post: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /challenges - Get all challenges
router.get('/challenges', protect, async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate('participants.member', 'name avatar')
      .sort({ startDate: -1 });
    res.json({ success: true, challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /challenges - Create a challenge (owner only)
router.post('/challenges', protect, authorize('owner'), async (req, res) => {
  try {
    const challengeData = pickChallengeFields(req.body);

    const requiredFields = ['title', 'description', 'startDate', 'endDate'];
    const missingField = requiredFields.find((field) => {
      const value = challengeData[field];
      return value === undefined || value === null || value === '';
    });
    if (missingField) {
      return res.status(400).json({ success: false, message: `${missingField} is required` });
    }

    if (challengeData.rewardPoints !== undefined) {
      const rewardPoints = Number(challengeData.rewardPoints);
      if (!Number.isFinite(rewardPoints) || rewardPoints < 0 || rewardPoints > 100000) {
        return res.status(400).json({ success: false, message: 'Invalid reward points' });
      }
      challengeData.rewardPoints = rewardPoints;
    }

    if (challengeData.maxParticipants !== undefined) {
      const maxParticipants = Number(challengeData.maxParticipants);
      if (!Number.isInteger(maxParticipants) || maxParticipants < 1 || maxParticipants > 10000) {
        return res.status(400).json({ success: false, message: 'Invalid maximum participants' });
      }
      challengeData.maxParticipants = maxParticipants;
    }

    if (challengeData.goalTarget !== undefined) {
      const goalTarget = Number(challengeData.goalTarget);
      if (!Number.isFinite(goalTarget) || goalTarget < 0 || goalTarget > 1000000) {
        return res.status(400).json({ success: false, message: 'Invalid goal target' });
      }
      challengeData.goalTarget = goalTarget;
    }

    const startDate = new Date(challengeData.startDate);
    const endDate = new Date(challengeData.endDate);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
      return res.status(400).json({ success: false, message: 'Invalid challenge dates' });
    }
    challengeData.startDate = startDate;
    challengeData.endDate = endDate;

    const challenge = await Challenge.create(challengeData);
    res.status(201).json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to create challenge' });
  }
});

// POST /challenges/:id/join - Join a challenge
router.post('/challenges/:id/join', protect, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

    const alreadyJoined = challenge.participants.find(
      (p) => p.member.toString() === req.user._id.toString()
    );
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'Already joined this challenge' });
    }

    challenge.participants.push({ member: req.user._id });
    await challenge.save();
    res.json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
