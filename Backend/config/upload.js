const path = require('path');

module.exports = {
  // Upload directories
  UPLOAD_DIR: 'uploads',
  COURSE_MATERIALS_DIR: path.join('uploads', 'course-materials'),
  PROFILE_IMAGES_DIR: path.join('uploads', 'profile-images'),
  COURSE_IMAGES_DIR: path.join('uploads', 'course-images'),
  ARTICLE_IMAGES_DIR: path.join('uploads', 'article-images'),

  // File size limits
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB

  // Allowed file types
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ],

  // File naming
  generateFileName: (originalname) => {
    const timestamp = Date.now();
    const extension = path.extname(originalname);
    const basename = path.basename(originalname, extension);
    return `${basename}-${timestamp}${extension}`;
  },

  // URL generation
  getFileUrl: (filename) => {
    return `/uploads/${filename}`;
  }
}; 