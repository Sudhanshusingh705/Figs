const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const asyncHandler = require('express-async-handler');

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    questions,
    timeLimit,
    passingScore,
    category,
    difficulty
  } = req.body;

  const quiz = await Quiz.create({
    title,
    description,
    questions,
    timeLimit,
    passingScore,
    category,
    difficulty,
    createdBy: req.user._id
  });

  res.status(201).json(quiz);
});

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const { category, difficulty, search } = req.query;
  let query = {};

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const quizzes = await Quiz.find(query)
    .populate('createdBy', 'name')
    .sort('-createdAt');
  res.json(quizzes);
});

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate('createdBy', 'name');

  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    quiz.title = req.body.title || quiz.title;
    quiz.description = req.body.description || quiz.description;
    quiz.questions = req.body.questions || quiz.questions;
    quiz.timeLimit = req.body.timeLimit || quiz.timeLimit;
    quiz.passingScore = req.body.passingScore || quiz.passingScore;
    quiz.category = req.body.category || quiz.category;
    quiz.difficulty = req.body.difficulty || quiz.difficulty;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    await quiz.remove();
    res.json({ message: 'Quiz removed' });
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Submit quiz result
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
  const { answers, timeTaken } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  // Calculate score
  let score = 0;
  const totalQuestions = quiz.questions.length;

  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score++;
    }
  });

  const percentageScore = (score / totalQuestions) * 100;
  const passed = percentageScore >= quiz.passingScore;

  const quizResult = await QuizResult.create({
    quiz: quiz._id,
    user: req.user._id,
    score: percentageScore,
    passed,
    answers,
    timeTaken
  });

  res.status(201).json(quizResult);
});

// @desc    Get user's quiz results
// @route   GET /api/quizzes/results
// @access  Private
const getUserQuizResults = asyncHandler(async (req, res) => {
  const results = await QuizResult.find({ user: req.user._id })
    .populate('quiz', 'title category difficulty')
    .sort('-createdAt');
  res.json(results);
});

// @desc    Get quiz statistics
// @route   GET /api/quizzes/:id/stats
// @access  Private/Admin
const getQuizStats = asyncHandler(async (req, res) => {
  const results = await QuizResult.find({ quiz: req.params.id });
  
  const stats = {
    totalAttempts: results.length,
    averageScore: results.reduce((acc, curr) => acc + curr.score, 0) / results.length,
    passRate: (results.filter(r => r.passed).length / results.length) * 100,
    averageTimeTaken: results.reduce((acc, curr) => acc + curr.timeTaken, 0) / results.length
  };

  res.json(stats);
});

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getUserQuizResults,
  getQuizStats
}; 