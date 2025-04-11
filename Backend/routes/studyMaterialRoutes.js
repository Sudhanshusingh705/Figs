const express = require('express');
const router = express.Router();
const {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterialById,
  updateStudyMaterial,
  deleteStudyMaterial,
  getCourseStudyMaterials
} = require('../controllers/studyMaterialController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protected routes
router.get('/', protect, getStudyMaterials);
router.get('/:id', protect, getStudyMaterialById);
router.get('/course/:courseId', protect, getCourseStudyMaterials);

// Admin routes
router.post('/', protect, authorize('admin'), createStudyMaterial);
router.put('/:id', protect, authorize('admin'), updateStudyMaterial);
router.delete('/:id', protect, authorize('admin'), deleteStudyMaterial);

module.exports = router; 