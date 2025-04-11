// API configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Authentication
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// User roles
export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  GUEST: 'guest'
};

// Quiz types
export const QUIZ_TYPES = {
  PRACTICE: 'practice',
  ASSESSMENT: 'assessment',
  MOCK_TEST: 'mock_test'
};

// Quiz difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Question types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SINGLE_CHOICE: 'single_choice',
  TRUE_FALSE: 'true_false',
  MATCHING: 'matching',
  SHORT_ANSWER: 'short_answer',
  LONG_ANSWER: 'long_answer'
};

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Course categories
export const COURSE_CATEGORIES = {
  MEDICAL: 'medical',
  NURSING: 'nursing',
  PHARMACY: 'pharmacy',
  DENTAL: 'dental',
  NEXT: 'next',
  GENERAL: 'general'
};

// Contact form subjects
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Course Information',
  'Technical Support',
  'Billing',
  'Feedback',
  'Partnership',
  'Other'
];

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/figsacademy',
  TWITTER: 'https://twitter.com/figsacademy',
  INSTAGRAM: 'https://instagram.com/figsacademy',
  LINKEDIN: 'https://linkedin.com/company/figsacademy',
  YOUTUBE: 'https://youtube.com/figsacademy'
};

// Dashboard tabs
export const DASHBOARD_TABS = {
  OVERVIEW: 'overview',
  COURSES: 'courses',
  QUIZZES: 'quizzes',
  PROGRESS: 'progress',
  SETTINGS: 'settings'
};

// Toast notification settings
export const TOAST_SETTINGS = {
  SUCCESS_DURATION: 3000,
  ERROR_DURATION: 5000,
  INFO_DURATION: 4000,
  WARNING_DURATION: 4000
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme_preference',
  QUIZ_PROGRESS: 'quiz_progress',
  RECENT_COURSES: 'recent_courses',
  LAST_VISIT: 'last_visit'
};

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}; 