const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Apply authentication middleware to all profile routes
router.use(protect);

// Profile information routes
router.get('/', userController.getUserProfile);
router.put('/', userController.updateUserProfile);
router.put('/password', userController.updatePassword);

// Profile activity
router.get('/activity', userController.getUserActivity);
router.get('/progress', userController.getUserProgress);

// Notifications
router.get('/notifications', userController.getUserNotifications);
router.put('/notifications/:id', userController.updateNotificationStatus);

// Preferences
router.put('/preferences', userController.updateUserPreferences);

module.exports = router; 