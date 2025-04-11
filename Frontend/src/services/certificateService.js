import apiService from './apiService';

const certificateService = {
  // Get all certificates for the current user
  getUserCertificates: async () => {
    try {
      const response = await apiService.get('/certificates');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific certificate by ID
  getCertificateById: async (certificateId) => {
    try {
      const response = await apiService.get(`/certificates/${certificateId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get certificate for a specific quiz completion
  getQuizCertificate: async (quizAttemptId) => {
    try {
      const response = await apiService.get(`/certificates/quiz/${quizAttemptId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get certificate for a specific course completion
  getCourseCertificate: async (courseId) => {
    try {
      const response = await apiService.get(`/certificates/course/${courseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate certificate PDF
  generatePDF: async (certificateId) => {
    try {
      const response = await apiService.get(`/certificates/${certificateId}/pdf`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify certificate authenticity
  verifyCertificate: async (verificationCode) => {
    try {
      const response = await apiService.get(`/certificates/verify/${verificationCode}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Share certificate via email
  shareCertificate: async (certificateId, emailData) => {
    try {
      const response = await apiService.post(`/certificates/${certificateId}/share`, emailData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Generate a custom certificate
  generateCustomCertificate: async (userData) => {
    try {
      const response = await apiService.post('/admin/certificates/generate', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Revoke a certificate
  revokeCertificate: async (certificateId, reason) => {
    try {
      const response = await apiService.post(`/admin/certificates/${certificateId}/revoke`, { reason });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get all certificates with optional filtering
  getAllCertificates: async (filters = {}) => {
    try {
      const response = await apiService.get('/admin/certificates', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default certificateService; 