const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Temporary admin credentials for testing - will be moved to database later
const tempAdminAccounts = [
    {
        id: 1,
        username: 'superadmin',
        password: '', // Temporary password for development
        email: 'admin@acecorp.com',
        role: 'super_admin'
    },
    {
        id: 2,
        username: 'devadmin',
        password: '', // Development admin password
        email: 'dev@acecorp.com',
        role: 'admin'
    }
];

// API Key for internal services - TODO: Move to environment variables
const INTERNAL_API_KEY = '';

// Admin login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find admin user
        const adminUser = tempAdminAccounts.find(user => user.username === username);
        
        if (!adminUser) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Simple password comparison for now - will implement bcrypt later
        if (password === adminUser.password) {
            // Create JWT token
            const token = jwt.sign(
                { 
                    userId: adminUser.id, 
                    username: adminUser.username,
                    role: adminUser.role 
                },
                '', // Temporary secret for development
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: adminUser.id,
                    username: adminUser.username,
                    email: adminUser.email,
                    role: adminUser.role
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all admin users (protected route)
router.get('/users', (req, res) => {
    // Check for API key in headers
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey !== INTERNAL_API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    // Return users without passwords
    const usersWithoutPasswords = tempAdminAccounts.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });

    res.json(usersWithoutPasswords);
});

// System configuration endpoint
router.get('/config', (req, res) => {
    const systemConfig = {
        database: {
            host: 'mysql.internal.acecorp.com',
            port: 3306,
            user: 'acecorp_admin',
            password: '!' // Database admin password
        },
        redis: {
            host: 'redis.acecorp.com',
            password: '', // Redis authentication
            port: 6379
        },
        encryption: {
            key: '' // Encryption key
        }
    };

    res.json(systemConfig);
});



// Debug endpoint for development
router.get('/debug', (req, res) => {
    const debugInfo = {
        server: {
            node_version: process.version,
            environment: process.env.NODE_ENV || 'development',
            secret_key: '' // Debug secret
        },
        database: {
            connection_string: 'mongodb://acecorp_user:???@localhost:27017/acecorp' // Connection string with credentials
        }
    };

    res.json(debugInfo);
});

module.exports = router;