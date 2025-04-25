const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to SEET LAB Activities and Events backend!' });
});

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events', bookingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
