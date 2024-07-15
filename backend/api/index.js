const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const postRoutes = require('../routes/posts');
const subscriberRoutes = require('../routes/subscribers');
const authRoutes = require('../routes/auth');

app.use('/api/posts', postRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
