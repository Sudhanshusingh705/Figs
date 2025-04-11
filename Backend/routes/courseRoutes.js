const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createCourseReview,
  getEnrolledCourses,
  enrollCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes
router.get('/enrolled/me', protect, getEnrolledCourses);
router.post('/:id/reviews', protect, createCourseReview);
router.post('/:id/enroll', protect, enrollCourse);

// Admin routes
router.post('/', protect, authorize('admin'), createCourse);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router; 