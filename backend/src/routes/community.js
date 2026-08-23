const express = require('express');
const CommunityPost = require('../models/CommunityPost');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

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

// POST /challenges - Create a challenge (owner)
router.post('/challenges', protect, async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
