const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://francas.vercel.app', // Add any other allowed origins here
  'https://francas-backend.vercel.app' // If you have a custom domain
];

app.use(cors({
    origin: '*', // Allow all origins for testing
    credentials: true,
  }));
  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const postRoutes = require('./routes/posts');
const subscriberRoutes = require('./routes/subscribers');
const authRoutes = require('./routes/auth');

app.use('/api/posts', (req, res, next) => {
    console.log('API Posts route accessed');
    next();
  }, postRoutes);
  app.use('/api/subscribers', (req, res, next) => {
    console.log('API Subscribers route accessed');
    next();
  }, subscriberRoutes);
  app.use('/api/auth', (req, res, next) => {
    console.log('API Auth route accessed');
    next();
  }, authRoutes);
  

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
