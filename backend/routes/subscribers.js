const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Add a new subscriber
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(409).json({ error: 'Already subscribed' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

module.exports = router;
