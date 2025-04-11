const { validationResult, body } = require('express-validator');

// Middleware to check for validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User validation rules
const userValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ];
};

// Course validation rules
const courseValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['NExT', 'Medical', 'General'])
      .withMessage('Invalid category'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('duration').trim().notEmpty().withMessage('Duration is required')
  ];
};

// Quiz validation rules
const quizValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('questions').isArray().withMessage('Questions must be an array'),
    body('questions.*.question').trim().notEmpty().withMessage('Question text is required'),
    body('questions.*.options').isArray().withMessage('Options must be an array'),
    body('questions.*.correctAnswer').isNumeric().withMessage('Correct answer must be specified'),
    body('timeLimit').isNumeric().withMessage('Time limit must be a number'),
    body('passingScore').isNumeric().withMessage('Passing score must be a number')
  ];
};

// Blog validation rules
const blogValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('category')
      .isIn(['Medical', 'Education', 'NExT', 'Research', 'General'])
      .withMessage('Invalid category'),
    body('tags').isArray().withMessage('Tags must be an array'),
    body('author').notEmpty().withMessage('Author is required')
  ];
};

// Article validation rules
const articleValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('category')
      .isIn(['Medical', 'Education', 'NExT', 'Research', 'General'])
      .withMessage('Invalid category'),
    body('tags').isArray().withMessage('Tags must be an array')
  ];
};

// Study material validation rules
const studyMaterialValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('type')
      .isIn(['document', 'video', 'audio', 'link'])
      .withMessage('Invalid material type'),
    body('content').trim().notEmpty().withMessage('Content is required')
  ];
};

// Combine validation rules with validation check
const validateBlog = [...blogValidationRules(), validateRequest];

module.exports = {
  validateRequest,
  userValidationRules,
  courseValidationRules,
  quizValidationRules,
  articleValidationRules,
  studyMaterialValidationRules,
  blogValidationRules,
  validateBlog
}; 