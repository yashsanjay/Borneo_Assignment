const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const rateLimiter = require('./middlewares/rateLimiter');
const sanitizeInput = require('./middlewares/sanitizeInput');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.set('trust proxy', true);
app.use(cors());

app.use(express.json());
app.use(rateLimiter);
app.use(sanitizeInput);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
