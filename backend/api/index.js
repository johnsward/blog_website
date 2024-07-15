const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Setup environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Support JSON-encoded bodies
app.use(cors()); // Enable CORS

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup API routes
const postRoutes = require('./api/posts'); // Adjust path as necessary
const subscriberRoutes = require('./api/subscribers'); // Adjust path as necessary
const authRoutes = require('./api/auth'); // Adjust path as necessary

app.use('/api/posts', postRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

// Export the configured Express app
module.exports = app;
