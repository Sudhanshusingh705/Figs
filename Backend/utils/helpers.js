const crypto = require('crypto');
const path = require('path');

// Generate a random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate a slug from a string
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Format date to readable string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate reading time for content
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};

// Validate file type
const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.mimetype);
};

// Generate unique filename
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const extension = path.extname(originalname);
  return `${timestamp}-${random}${extension}`;
};

// Paginate results
const paginateResults = (page, limit) => {
  const skip = (page - 1) * limit;
  return {
    skip,
    limit
  };
};

// Sort results
const getSortOptions = (sortBy = 'createdAt', sortOrder = 'desc') => {
  return {
    [sortBy]: sortOrder === 'desc' ? -1 : 1
  };
};

// Format error message
const formatErrorMessage = (error) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return errors.join(', ');
  }
  return error.message;
};

// Check if user has required role
const hasRole = (user, requiredRole) => {
  return user && user.role === requiredRole;
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

module.exports = {
  generateRandomString,
  generateSlug,
  formatDate,
  calculateReadingTime,
  validateFileType,
  generateUniqueFilename,
  paginateResults,
  getSortOptions,
  formatErrorMessage,
  hasRole,
  formatFileSize
}; 