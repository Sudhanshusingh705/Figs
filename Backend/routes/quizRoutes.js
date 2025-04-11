const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { protect, validateAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuizById);

// Protected routes (require authentication)
router.use(protect);
router.post('/:id/submit', quizController.submitQuiz);
router.get('/results', quizController.getUserQuizResults);

// Admin routes
router.post('/', validateAdmin, quizController.createQuiz);
router.put('/:id', validateAdmin, quizController.updateQuiz);
router.delete('/:id', validateAdmin, quizController.deleteQuiz);
router.get('/:id/stats', validateAdmin, quizController.getQuizStats);

module.exports = router; 