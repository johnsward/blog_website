const jwt = require('jsonwebtoken');
const connectToDatabase = require('../utils/db'); 
const User = require('../models/User');

module.exports = async (req, res) => {
    await connectToDatabase();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user;
        if (decoded.role === 'admin') {
            user = await User.findById(decoded.id);
        } else {
            user = { role: 'user' };  // For regular users, we only have role information
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};
