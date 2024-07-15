const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../utils/db'); 
const User = require('../models/User');

module.exports = async (req, res) => {
    await connectToDatabase();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
