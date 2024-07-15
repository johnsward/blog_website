const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../utils/db'); 
const User = require('../models/User');

const app = express();
app.use(express.json());

app.post('/api/admin/login', async (req, res) => {
    await connectToDatabase();

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

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error('Login error for admin:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = app;
