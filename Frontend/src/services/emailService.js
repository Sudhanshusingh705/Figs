import apiService from './apiService';

const emailService = {
  // Send contact form submission
  sendContactForm: async (formData) => {
    try {
      const response = await apiService.post('/contact', formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send course inquiry
  sendCourseInquiry: async (courseId, inquiryData) => {
    try {
      const response = await apiService.post(`/inquiries/course/${courseId}`, inquiryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send quiz inquiry
  sendQuizInquiry: async (quizId, inquiryData) => {
    try {
      const response = await apiService.post(`/inquiries/quiz/${quizId}`, inquiryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Book counseling session
  bookCounseling: async (counselingData) => {
    try {
      const response = await apiService.post('/counseling', counselingData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email, preferences = {}) => {
    try {
      const response = await apiService.post('/newsletter/subscribe', {
        email,
        preferences
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Unsubscribe from newsletter
  unsubscribeNewsletter: async (email, token) => {
    try {
      const response = await apiService.post('/newsletter/unsubscribe', {
        email,
        token
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Send bulk email to users
  sendBulkEmail: async (emailData) => {
    try {
      const response = await apiService.post('/admin/email/bulk', emailData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Send notification to specific user
  sendUserNotification: async (userId, notificationData) => {
    try {
      const response = await apiService.post(`/admin/email/user/${userId}`, notificationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get contact form submissions with optional filtering
  getContactSubmissions: async (filters = {}) => {
    try {
      const response = await apiService.get('/admin/contact', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get course inquiries with optional filtering
  getCourseInquiries: async (filters = {}) => {
    try {
      const response = await apiService.get('/admin/inquiries/course', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // For admin: Get counseling bookings with optional filtering
  getCounselingBookings: async (filters = {}) => {
    try {
      const response = await apiService.get('/admin/counseling', { params: filters });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default emailService; 