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

// Add CORS middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
// }));

app.use(
  cors({
    origin: 'https://your-vercel-domain.vercel.app', // Replace with your actual frontend domain
    methods: 'GET,POST,PUT,DELETE', // Specify the HTTP methods you allow
    credentials: true, // If you use cookies/auth tokens
  })
);

app.use(express.json());
app.use(rateLimiter);
app.use(sanitizeInput);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
