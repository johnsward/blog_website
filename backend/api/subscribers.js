// /api/subscribe.js
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');
const connectToDatabase = require('../utils/db');

module.exports = async (req, res) => {
    await connectToDatabase();

    if (req.method === 'POST') {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        try {
            const newSubscriber = new Subscriber({ email });
            await newSubscriber.save();
            res.status(201).json({ message: 'Subscribed successfully' });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ error: 'Already subscribed' });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }
};


