const express = require('express');
const Like = require('../models/like');
const Blog = require('../models/blog');
const likeRouter = express.Router();

likeRouter.post('/test-like', async (req, res) => {
    const body = req.body;
  const newLike = new Like({
    blogId: body.blogId,
    userIdentifier: "unique-user-id"
  });

  try {
    await newLike.save();
    await Blog.findByIdAndUpdate(newLike.blogId, { $inc: { likes: 1 } });
    res.status(201).json(newLike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = likeRouter;
