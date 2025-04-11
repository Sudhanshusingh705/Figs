const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['NExT', 'Medical', 'General']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  price: {
    type: Number,
    default: 0
  },
  discountPrice: {
    type: Number
  },
  duration: {
    type: String, // e.g., "10 hours", "6 weeks"
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String, // URL to the thumbnail image
    required: true
  },
  banner: {
    type: String // URL to the banner image
  },
  videoUrl: {
    type: String // URL to the course preview video
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  studyMaterials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyMaterial'
  }],
  faq: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String
  }],
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  whatYouWillLearn: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema); 