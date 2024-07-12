const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
    'https://francas-45u1z5mf1-john-swards-projects.vercel.app', // Your frontend's Vercel URL
    'https://francas-backend-bycceqdkt-john-swards-projects.vercel.app' // Your backend's Vercel URL
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const postRoutes = require('./routes/posts');
const subscriberRoutes = require('./routes/subscribers');
const authRoutes = require('./routes/auth');

app.use('/api/posts', postRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
