const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const upload = require('../middleware/Upload');

// Middleware to get a post by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.post = post;
    next();
}

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a post
router.post('/', upload, async (req, res) => {
    const imageUrl = req.files.image ? `/uploads/${req.files.image[0].filename}` : null;
    const videoUrl = req.files.video ? `/uploads/${req.files.video[0].filename}` : null;

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl,
        videoUrl,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
