const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${BASE_URL}/auth/verify-email`,
    PROFILE: `${BASE_URL}/auth/profile`,
  },
  QUIZ: {
    LIST: `${BASE_URL}/quizzes`,
    DETAIL: `${BASE_URL}/quizzes`,
    CREATE: `${BASE_URL}/quizzes`,
    UPDATE: `${BASE_URL}/quizzes`,
    DELETE: `${BASE_URL}/quizzes`,
    SUBMIT: `${BASE_URL}/quizzes/submit`,
    RESULTS: `${BASE_URL}/quizzes/results`,
  },
  MOCK_TEST: {
    LIST: `${BASE_URL}/mock-tests`,
    DETAIL: `${BASE_URL}/mock-tests`,
    CREATE: `${BASE_URL}/mock-tests`,
    UPDATE: `${BASE_URL}/mock-tests`,
    DELETE: `${BASE_URL}/mock-tests`,
    SUBMIT: `${BASE_URL}/mock-tests/submit`,
    RESULTS: `${BASE_URL}/mock-tests/results`,
  },
  STUDY_MATERIAL: {
    LIST: `${BASE_URL}/study-materials`,
    DETAIL: `${BASE_URL}/study-materials`,
    CREATE: `${BASE_URL}/study-materials`,
    UPDATE: `${BASE_URL}/study-materials`,
    DELETE: `${BASE_URL}/study-materials`,
  },
  COURSE: {
    LIST: `${BASE_URL}/courses`,
    DETAIL: `${BASE_URL}/courses`,
    CREATE: `${BASE_URL}/courses`,
    UPDATE: `${BASE_URL}/courses`,
    DELETE: `${BASE_URL}/courses`,
    ENROLL: `${BASE_URL}/courses/enroll`,
    PROGRESS: `${BASE_URL}/courses/progress`,
  },
  BLOG: {
    LIST: `${BASE_URL}/blogs`,
    DETAIL: `${BASE_URL}/blogs`,
    CREATE: `${BASE_URL}/blogs`,
    UPDATE: `${BASE_URL}/blogs`,
    DELETE: `${BASE_URL}/blogs`,
    COMMENTS: `${BASE_URL}/blogs/comments`,
  },
  ARTICLE: {
    LIST: `${BASE_URL}/articles`,
    DETAIL: `${BASE_URL}/articles`,
    CREATE: `${BASE_URL}/articles`,
    UPDATE: `${BASE_URL}/articles`,
    DELETE: `${BASE_URL}/articles`,
    COMMENTS: `${BASE_URL}/articles/comments`,
  },
  USER: {
    LIST: `${BASE_URL}/users`,
    DETAIL: `${BASE_URL}/users`,
    UPDATE: `${BASE_URL}/users`,
    DELETE: `${BASE_URL}/users`,
    DASHBOARD: `${BASE_URL}/users/dashboard`,
  },
  ADMIN: {
    DASHBOARD: `${BASE_URL}/admin/dashboard`,
    STATS: `${BASE_URL}/admin/stats`,
  },
  HOME: {
    CONTENT: `${BASE_URL}/home/content`,
  },
};

// Application routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ADMIN_LOGIN: '/admin/login',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  QUIZ: {
    LIST: '/quizzes',
    DETAIL: (id) => `/quizzes/${id}`,
    ATTEMPT: (id) => `/quizzes/${id}/attempt`,
    RESULTS: (id, attemptId) => `/quizzes/${id}/results/${attemptId}`
  },
  MOCK_TEST: {
    LIST: '/mock-tests',
    DETAIL: (id) => `/mock-tests/${id}`,
    ATTEMPT: (id) => `/mock-tests/${id}/attempt`,
    RESULTS: (id, attemptId) => `/mock-tests/${id}/results/${attemptId}`
  },
  COURSE: {
    LIST: '/courses',
    DETAIL: (id) => `/courses/${id}`,
    LESSON: (id, lessonId) => `/courses/${id}/lesson/${lessonId}`
  },
  STUDY_MATERIAL: {
    LIST: '/study-materials',
    DETAIL: (id) => `/study-materials/${id}`
  },
  BLOG: {
    LIST: '/blogs',
    DETAIL: (id) => `/blogs/${id}`,
    CATEGORY: (category) => `/blogs/category/${category}`,
    TAG: (tag) => `/blogs/tag/${tag}`
  },
  ARTICLE: {
    LIST: '/articles',
    DETAIL: (id) => `/articles/${id}`,
    CATEGORY: (category) => `/articles/category/${category}`
  }
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

export default API_ENDPOINTS; 