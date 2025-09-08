const express = require('express');
const connectDB = require('./config/database');
const securityConfig = require('./config/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.listen(PORT, () => {
    console.log(`AceCorp Management Panel running on port ${PORT}`);
    connectDB();
});