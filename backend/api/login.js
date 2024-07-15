const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../utils/db'); 
const User = require('../models/User');

module.exports = async (req, res) => {
    await connectToDatabase();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { password } = req.body;
    try {
        const isMatch = await bcrypt.compare(password, process.env.BLOG_ACCESS_PASSWORD_HASH);
        if (isMatch) {
            const token = jwt.sign({ role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user: { role: 'user' } });
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
