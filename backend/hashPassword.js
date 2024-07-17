const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model
require('dotenv').config(); // Ensure you have your .env file set up

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const createAdmin = async () => {
    const email = 'philipsonfranca@gmail.com';
    const password = 'Barnholmen';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
        email: email,
        password: hashedPassword,
        role: 'admin'
    });

    try {
        await admin.save();
        console.log('Admin user created');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.disconnect();
    }
};

createAdmin();