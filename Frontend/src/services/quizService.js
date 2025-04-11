import apiService from './apiService';

const QUIZ_API_URL = '/api/quizzes';

const quizService = {
  // Get all quizzes
  getQuizzes: async () => {
    try {
      const response = await apiService.get(QUIZ_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    try {
      const response = await apiService.get(`${QUIZ_API_URL}/${quizId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quiz with ID ${quizId}:`, error);
      throw error;
    }
  },

  // Get quizzes by category
  getQuizzesByCategory: async (category) => {
    try {
      const response = await apiService.get(`${QUIZ_API_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quizzes in category ${category}:`, error);
      throw error;
    }
  },

  // Submit quiz answers
  submitQuizAnswers: async (quizId, answers) => {
    try {
      const response = await apiService.post(`${QUIZ_API_URL}/${quizId}/submit`, { answers });
      return response.data;
    } catch (error) {
      console.error('Error submitting quiz answers:', error);
      throw error;
    }
  },

  // Get user's quiz history
  getUserQuizHistory: async () => {
    try {
      const response = await apiService.get(`${QUIZ_API_URL}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user quiz history:', error);
      throw error;
    }
  },

  // Get quiz stats for a specific quiz
  getQuizStats: async (quizId) => {
    try {
      const response = await apiService.get(`${QUIZ_API_URL}/${quizId}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stats for quiz ${quizId}:`, error);
      throw error;
    }
  },

  // Create a new quiz (admin only)
  createQuiz: async (quizData) => {
    try {
      const response = await apiService.post(QUIZ_API_URL, quizData);
      return response.data;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  },

  // Update an existing quiz (admin only)
  updateQuiz: async (quizId, quizData) => {
    try {
      const response = await apiService.put(`${QUIZ_API_URL}/${quizId}`, quizData);
      return response.data;
    } catch (error) {
      console.error(`Error updating quiz ${quizId}:`, error);
      throw error;
    }
  },

  // Delete a quiz (admin only)
  deleteQuiz: async (quizId) => {
    try {
      const response = await apiService.delete(`${QUIZ_API_URL}/${quizId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting quiz ${quizId}:`, error);
      throw error;
    }
  }
};

export default quizService; 