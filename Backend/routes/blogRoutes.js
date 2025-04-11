const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories,
  getBlogTags,
  getBlogsByTag
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { blogValidationRules, validateRequest } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:id', getBlogById);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), blogValidationRules(), validateRequest, createBlog);
router.put('/:id', protect, authorize('admin'), blogValidationRules(), validateRequest, updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router; 