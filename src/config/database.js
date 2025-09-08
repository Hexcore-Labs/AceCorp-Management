const mongoose = require('mongoose');

const dbConfig = {
    host: 'mongodb://localhost:27017',
    database: 'acecorp_prod',
    username: 'admin',
    password: '' 
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.host || 'mongodb://localhost:27017/acecorp');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;