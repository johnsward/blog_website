// /api/posts.js
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/mailer');
const connectToDatabase = require('../utils/db');  // Ensure DB connections are managed effectively

// This helper function is used for fetching a post by ID
async function getPostById(postId) {
    await connectToDatabase();
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (err) {
        throw err;
    }
}

module.exports = async (req, res) => {
    await connectToDatabase();  // Connect to MongoDB

    switch (req.method) {
        case 'GET':
            if (req.query.id) {
                // Fetch a single post
                try {
                    const post = await getPostById(req.query.id);
                    res.status(200).json(post);
                } catch (err) {
                    res.status(404).json({ message: err.message });
                }
            } else {
                // Fetch all posts
                try {
                    const posts = await Post.find();
                    res.status(200).json(posts);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
            break;
        
        case 'POST':
            // Add a new post
            const { title, content, date, label, imageUrls, videoUrls } = req.body;
            const post = new Post({
                title,
                content,
                date: date ? new Date(date) : new Date(),
                label,
                imageUrls,
                videoUrls
            });

            try {
                const newPost = await post.save();
                // Notify subscribers
                const subscribers = await Subscriber.find({});
                const emailPromises = subscribers.map(subscriber =>
                    sendEmail(subscriber.email, 'New Post Alert', `A new post titled "${newPost.title}" has been published on the blog.`)
                );
                await Promise.all(emailPromises);

                res.status(201).json(newPost);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
            break;

        case 'DELETE':
            // Delete a post
            try {
                const postToDelete = await getPostById(req.query.id);
                await postToDelete.remove();
                res.status(200).json({ message: 'Post deleted' });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;

        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
};
