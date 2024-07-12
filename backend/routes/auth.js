const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const blogAccessPasswordHash = process.env.BLOG_ACCESS_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

// Regular user login
router.post('/login', async (req, res) => {
    const { password } = req.body;

    try {
        const isMatch = await bcrypt.compare(password, blogAccessPasswordHash);
        if (isMatch) {
            const token = jwt.sign({ role: 'user' }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token, user: { role: 'user' } }); // Include user data
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.error("Error verifying blog access password:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Admin login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            console.log('No admin user found for email:', email);
            return res.status(401).json({ message: 'Access Denied' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for admin user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error('Login error for admin:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Token validation endpoint
router.post('/validateToken', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
