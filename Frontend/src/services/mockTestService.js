import apiService from './apiService';

const mockTestService = {
  // Get all available mock tests with optional filtering
  getMockTests: async (filters = {}) => {
    try {
      const response = await apiService.get('/mock-tests', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific mock test by ID
  getMockTestById: async (mockTestId) => {
    try {
      const response = await apiService.get(`/mock-tests/${mockTestId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get mock tests by category or type
  getMockTestsByCategory: async (category) => {
    try {
      const response = await apiService.get('/mock-tests', { 
        params: { category } 
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Enroll in a mock test
  enrollMockTest: async (mockTestId, userData) => {
    try {
      const response = await apiService.post(`/mock-tests/${mockTestId}/enroll`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Start a mock test attempt
  startMockTest: async (mockTestId) => {
    try {
      const response = await apiService.post(`/mock-tests/${mockTestId}/start`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Submit a mock test attempt
  submitMockTest: async (mockTestId, attemptId, answers) => {
    try {
      const response = await apiService.post(`/mock-tests/${mockTestId}/attempts/${attemptId}/submit`, { answers });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Save progress in the mock test attempt
  saveMockTestProgress: async (mockTestId, attemptId, answers) => {
    try {
      const response = await apiService.post(`/mock-tests/${mockTestId}/attempts/${attemptId}/save`, { answers });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get a user's mock test attempts
  getUserMockTestAttempts: async (mockTestId = null) => {
    try {
      const endpoint = mockTestId 
        ? `/mock-tests/${mockTestId}/attempts` 
        : '/user/mock-test-attempts';
        
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get detailed results for a specific mock test attempt
  getMockTestResults: async (mockTestId, attemptId) => {
    try {
      const response = await apiService.get(`/mock-tests/${mockTestId}/attempts/${attemptId}/results`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get leaderboard for a mock test
  getMockTestLeaderboard: async (mockTestId) => {
    try {
      const response = await apiService.get(`/mock-tests/${mockTestId}/leaderboard`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Create a new mock test
  createMockTest: async (mockTestData) => {
    try {
      const response = await apiService.post('/admin/mock-tests', mockTestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Update a mock test
  updateMockTest: async (mockTestId, mockTestData) => {
    try {
      const response = await apiService.put(`/admin/mock-tests/${mockTestId}`, mockTestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Delete a mock test
  deleteMockTest: async (mockTestId) => {
    try {
      const response = await apiService.delete(`/admin/mock-tests/${mockTestId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get all mock test attempts with optional filtering
  getAllMockTestAttempts: async (filters = {}) => {
    try {
      const response = await apiService.get('/admin/mock-test-attempts', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get statistics for a mock test
  getMockTestStatistics: async (mockTestId) => {
    try {
      const response = await apiService.get(`/admin/mock-tests/${mockTestId}/statistics`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default mockTestService; 