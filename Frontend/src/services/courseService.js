import apiService from './apiService';

const courseService = {
  // Get all courses with optional filtering
  getCourses: async (filters = {}) => {
    try {
      const response = await apiService.get('/courses', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get a single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await apiService.get(`/courses/${courseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get courses by category
  getCoursesByCategory: async (category) => {
    try {
      const response = await apiService.get('/courses', { 
        params: { category } 
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get featured courses
  getFeaturedCourses: async () => {
    try {
      const response = await apiService.get('/courses/featured');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get recent courses
  getRecentCourses: async (limit = 6) => {
    try {
      const response = await apiService.get('/courses/recent', {
        params: { limit }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Enroll in a course
  enrollCourse: async (courseId, userData) => {
    try {
      const response = await apiService.post(`/courses/${courseId}/enroll`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Submit a course review
  submitReview: async (courseId, reviewData) => {
    try {
      const response = await apiService.post(`/courses/${courseId}/reviews`, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get course reviews
  getCourseReviews: async (courseId) => {
    try {
      const response = await apiService.get(`/courses/${courseId}/reviews`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user's enrolled courses
  getUserCourses: async () => {
    try {
      const response = await apiService.get('/user/courses');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Track course progress
  updateProgress: async (courseId, progressData) => {
    try {
      const response = await apiService.post(`/courses/${courseId}/progress`, progressData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Create a new course
  createCourse: async (courseData) => {
    try {
      const response = await apiService.post('/admin/courses', courseData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Update a course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await apiService.put(`/admin/courses/${courseId}`, courseData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Delete a course
  deleteCourse: async (courseId) => {
    try {
      const response = await apiService.delete(`/admin/courses/${courseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get course enrollment statistics
  getCourseStatistics: async (courseId) => {
    try {
      const response = await apiService.get(`/admin/courses/${courseId}/statistics`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default courseService; 