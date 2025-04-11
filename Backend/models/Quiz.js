const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    bannerImage: {
      type: String,
      default: 'default-quiz-banner.jpg',
    },
    timeLimit: {
      type: Number,
      required: [true, 'Please specify a time limit in minutes'],
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, 'Please add a question'],
        },
        options: [
          {
            text: {
              type: String,
              required: [true, 'Please add option text'],
            },
            isCorrect: {
              type: Boolean,
              default: false,
            },
          },
        ],
        explanation: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    passingScore: {
      type: Number,
      required: [true, 'Please specify a passing score percentage'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema); 