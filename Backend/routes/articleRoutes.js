const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  addArticleComment,
  likeArticle
} = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected routes
router.post('/:id/comments', protect, addArticleComment);
router.post('/:id/like', protect, likeArticle);

// Admin routes
router.post('/', protect, authorize('admin'), createArticle);
router.put('/:id', protect, authorize('admin'), updateArticle);
router.delete('/:id', protect, authorize('admin'), deleteArticle);

module.exports = router; 