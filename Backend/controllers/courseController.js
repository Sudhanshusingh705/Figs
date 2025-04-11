const Course = require('../models/Course');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json(course);
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const { category, level, search } = req.query;

  let query = {};

  if (category) query.category = category;
  if (level) query.level = level;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const count = await Course.countDocuments(query);
  const courses = await Course.find(query)
    .populate('createdBy', 'name')
    .populate('studyMaterials')
    .sort('-createdAt')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    courses,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('createdBy', 'name')
    .populate('studyMaterials')
    .populate('reviews.user', 'name');

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    Object.keys(req.body).forEach(key => {
      course[key] = req.body[key];
    });

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Add course review
// @route   POST /api/courses/:id/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    const alreadyReviewed = course.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Course already reviewed');
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    course.reviews.push(review);
    course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length;

    await course.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Get enrolled courses
// @route   GET /api/courses/enrolled
// @access  Private
const getEnrolledCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('enrolledCourses');
  res.json(user.enrolledCourses);
});

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (course && user) {
    const alreadyEnrolled = user.enrolledCourses.includes(course._id);

    if (alreadyEnrolled) {
      res.status(400);
      throw new Error('Already enrolled in this course');
    }

    user.enrolledCourses.push(course._id);
    course.enrolledStudents += 1;

    await user.save();
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } else {
    res.status(404);
    throw new Error('Course or user not found');
  }
});

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createCourseReview,
  getEnrolledCourses,
  enrollCourse
}; 