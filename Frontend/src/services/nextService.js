import apiService from './apiService';

const NEXT_API_URL = '/api/next';

const nextService = {
  // Get all NExT courses
  getCourses: async () => {
    try {
      const response = await apiService.get(`${NEXT_API_URL}/courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NExT courses:', error);
      throw error;
    }
  },

  // Get a single NExT course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await apiService.get(`${NEXT_API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching NExT course with ID ${courseId}:`, error);
      throw error;
    }
  },

  // Register for a NExT course
  registerForCourse: async (courseId, userData) => {
    try {
      const response = await apiService.post(`${NEXT_API_URL}/courses/${courseId}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering for NExT course:', error);
      throw error;
    }
  },

  // Get NExT exam dates and information
  getExamInfo: async () => {
    try {
      const response = await apiService.get(`${NEXT_API_URL}/exam-info`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NExT exam information:', error);
      throw error;
    }
  },

  // Get study resources for NExT preparation
  getStudyResources: async () => {
    try {
      const response = await apiService.get(`${NEXT_API_URL}/resources`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NExT study resources:', error);
      throw error;
    }
  },

  // Get frequently asked questions about NExT
  getFAQs: async () => {
    try {
      const response = await apiService.get(`${NEXT_API_URL}/faqs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NExT FAQs:', error);
      throw error;
    }
  },

  // Submit a question about NExT
  submitQuestion: async (questionData) => {
    try {
      const response = await apiService.post(`${NEXT_API_URL}/questions`, questionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting question about NExT:', error);
      throw error;
    }
  }
};

export default nextService; 