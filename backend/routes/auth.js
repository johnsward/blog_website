// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const blogAccessPasswordHash = process.env.BLOG_ACCESS_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

console.log("BLOG_ACCESS_PASSWORD_HASH:", blogAccessPasswordHash);
console.log("JWT_SECRET:", jwtSecret);

// Regular user login
router.post('/login', async (req, res) => {
    const { password } = req.body;

    try {
        console.log("Received password:", password);
        const isMatch = await bcrypt.compare(password, blogAccessPasswordHash);
        console.log("Password match:", isMatch);
        if (isMatch) {
            const token = jwt.sign({ role: 'user' }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token, user: { role: 'user' } });
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.error("Error verifying blog access password:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Other routes ...

module.exports = router;
