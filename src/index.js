const express = require('express');
const connectDB = require('./config/database');
const { authenticateAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Public routes
app.use('/auth', require('./routes/auth'));

// Protected admin routes
app.use('/admin', require('./routes/admin'));

// API routes with optional authentication
app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`AceCorp Management Panel running on port ${PORT}`);
    connectDB();
});