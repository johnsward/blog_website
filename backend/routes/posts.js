const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Subscriber = require('../models/Subscriber');
const upload = require('../middleware/Upload');
const sendEmail = require('../utils/mailer');

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

//Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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
    const imageUrls = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : [];
    const videoUrls = req.files['videos'] ? req.files['videos'].map(file => `/uploads/${file.filename}`) : [];

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        label: req.body.label,
        imageUrls,
        videoUrls
    });

    try {
        const newPost = await post.save();
        // Notify subscribers
        const subscribers = await Subscriber.find({});
        const emailPromises = subscribers.map(subscriber =>
            sendEmail(subscriber.email, 'New Post Alert', `A new post titled "${post.title}" has been published on the blog.`)
        );
        await Promise.all(emailPromises);

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
