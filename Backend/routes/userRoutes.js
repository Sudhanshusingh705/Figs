const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, validateAdmin } = require('../middleware/authMiddleware');

// Protected routes (require authentication)
router.use(protect);

// User profile routes
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.put('/password', userController.updatePassword);

// User activity routes
router.get('/activity', userController.getUserActivity);
router.get('/progress', userController.getUserProgress);
router.get('/enrollments', userController.getUserEnrollments);

// User preferences
router.put('/preferences', userController.updateUserPreferences);
router.get('/notifications', userController.getUserNotifications);
router.put('/notifications/:id', userController.updateNotificationStatus);

// Admin only routes - must come after the protect middleware
router.get('/', validateAdmin, userController.getAllUsers);
router.get('/:id', validateAdmin, userController.getUserById);
router.put('/:id', validateAdmin, userController.updateUser);
router.delete('/:id', validateAdmin, userController.deleteUser);

module.exports = router; 