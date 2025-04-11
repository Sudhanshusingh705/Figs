const StudyMaterial = require('../models/StudyMaterial');
const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');

// @desc    Create new study material
// @route   POST /api/study-materials
// @access  Private/Admin
const createStudyMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const studyMaterial = await StudyMaterial.create({
    ...req.body,
    createdBy: req.user._id
  });

  if (courseId) {
    const course = await Course.findById(courseId);
    if (course) {
      course.studyMaterials.push(studyMaterial._id);
      await course.save();
    }
  }

  res.status(201).json(studyMaterial);
});

// @desc    Get all study materials
// @route   GET /api/study-materials
// @access  Private
const getStudyMaterials = asyncHandler(async (req, res) => {
  const { courseId, category, type } = req.query;
  let query = {};

  if (courseId) query.course = courseId;
  if (category) query.category = category;
  if (type) query.type = type;

  const studyMaterials = await StudyMaterial.find(query)
    .populate('createdBy', 'name')
    .populate('course', 'title')
    .sort('-createdAt');

  res.json(studyMaterials);
});

// @desc    Get single study material
// @route   GET /api/study-materials/:id
// @access  Private
const getStudyMaterialById = asyncHandler(async (req, res) => {
  const studyMaterial = await StudyMaterial.findById(req.params.id)
    .populate('createdBy', 'name')
    .populate('course', 'title');

  if (studyMaterial) {
    res.json(studyMaterial);
  } else {
    res.status(404);
    throw new Error('Study material not found');
  }
});

// @desc    Update study material
// @route   PUT /api/study-materials/:id
// @access  Private/Admin
const updateStudyMaterial = asyncHandler(async (req, res) => {
  const studyMaterial = await StudyMaterial.findById(req.params.id);

  if (studyMaterial) {
    Object.keys(req.body).forEach(key => {
      studyMaterial[key] = req.body[key];
    });

    const updatedStudyMaterial = await studyMaterial.save();
    res.json(updatedStudyMaterial);
  } else {
    res.status(404);
    throw new Error('Study material not found');
  }
});

// @desc    Delete study material
// @route   DELETE /api/study-materials/:id
// @access  Private/Admin
const deleteStudyMaterial = asyncHandler(async (req, res) => {
  const studyMaterial = await StudyMaterial.findById(req.params.id);

  if (studyMaterial) {
    // Remove study material reference from course
    if (studyMaterial.course) {
      const course = await Course.findById(studyMaterial.course);
      if (course) {
        course.studyMaterials = course.studyMaterials.filter(
          id => id.toString() !== studyMaterial._id.toString()
        );
        await course.save();
      }
    }

    await studyMaterial.remove();
    res.json({ message: 'Study material removed' });
  } else {
    res.status(404);
    throw new Error('Study material not found');
  }
});

// @desc    Get study materials by course
// @route   GET /api/courses/:courseId/study-materials
// @access  Private
const getCourseStudyMaterials = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  const studyMaterials = await StudyMaterial.find({ course: req.params.courseId })
    .populate('createdBy', 'name')
    .sort('-createdAt');

  res.json(studyMaterials);
});

module.exports = {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterialById,
  updateStudyMaterial,
  deleteStudyMaterial,
  getCourseStudyMaterials
}; 