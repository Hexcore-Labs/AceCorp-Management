const express = require('express');
const router = express.Router();

// Mock data for admin dashboard
const adminStats = {
    totalUsers: 1542,
    activeUsers: 1247,
    newRegistrations: 87,
    systemStatus: 'operational'
};

const recentActivities = [
    { id: 1, user: 'john.doe', action: 'login', timestamp: new Date() },
    { id: 2, user: 'jane.smith', action: 'profile_update', timestamp: new Date() },
    { id: 3, user: 'admin', action: 'config_change', timestamp: new Date() }
];

// Admin dashboard overview
router.get('/dashboard', (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                stats: adminStats,
                recentActivities: recentActivities.slice(0, 5),
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch dashboard data'
        });
    }
});

// User management endpoints
router.get('/users', (req, res) => {
    // This would normally fetch from database
    const users = [
        { id: 1, username: 'john.doe', email: 'john@example.com', role: 'user', status: 'active' },
        { id: 2, username: 'jane.smith', email: 'jane@example.com', role: 'user', status: 'active' },
        { id: 3, username: 'admin', email: 'admin@acecorp.com', role: 'admin', status: 'active' }
    ];
    
    res.json({
        success: true,
        data: users,
        total: users.length
    });
});

// System configuration endpoint
router.get('/system-config', (req, res) => {
    const config = {
        appName: 'AceCorp Management Panel',
        version: '1.2.0',
        environment: process.env.NODE_ENV || 'development',
        features: {
            userManagement: true,
            analytics: true,
            reporting: false
        }
    };
    
    res.json({
        success: true,
        data: config
    });
});

// Health check endpoint
router.get('/health', (req, res) => {
    const healthStatus = {
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: 'connected' // This would be checked dynamically
    };
    
    res.json(healthStatus);
});

module.exports = router;