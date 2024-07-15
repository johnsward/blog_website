const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Support JSON-encoded bodies
app.use(cors()); // Enable CORS

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup API routes
// Assuming each route handler is a serverless function and will be deployed as such
app.use('/api/posts', require('./api/posts'));
app.use('/api/subscribers', require('./api/subscribers'));
app.use('/api/auth', require('./api/auth')); // This should include both login and validateToken routes

// Note: No need to set up a listener or database connection directly here
// Export the configured Express app for Vercel to use as serverless functions
module.exports = app;
