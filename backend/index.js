const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use routes
const postRoutes = require('./routes/posts');
const subscriberRoutes = require('./routes/subscribers');
const authRoutes = require('./routes/auth');

app.use('/api/posts', postRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
