const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['lecture_note', 'video', 'pdf', 'presentation'],
      required: [true, 'Please specify material type'],
    },
    fileUrl: {
      type: String,
      required: [true, 'Please add file URL or path'],
    },
    thumbnailUrl: {
      type: String,
      default: 'default-thumbnail.jpg',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: {
      type: Number, // In minutes (for videos or estimated reading time)
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    relatedQuizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add text index for search capabilities
studyMaterialSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema); 