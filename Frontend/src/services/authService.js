import apiService from './apiService';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiService.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiService.post('/auth/login', credentials);
      
      // Store auth data in local storage
      if (response.token) {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Optional: Call backend to invalidate token
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage regardless of API response
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await apiService.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiService.post('/auth/reset-password', {
        token,
        password: newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await apiService.get('/auth/me');
      
      // Update stored user data
      localStorage.setItem(USER_KEY, JSON.stringify(response));
      
      return response;
    } catch (error) {
      // If 401 error, user is not authenticated
      if (error.status === 401) {
        authService.logout();
      }
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await apiService.put('/auth/profile', userData);
      
      // Update stored user data
      const currentUser = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
      localStorage.setItem(USER_KEY, JSON.stringify({
        ...currentUser,
        ...response
      }));
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify email with token
  verifyEmail: async (token) => {
    try {
      const response = await apiService.post('/auth/verify-email', { token });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await apiService.post('/auth/resend-verification', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get stored user data
  getStoredUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing stored user data', error);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  // Check if user has a specific role
  hasRole: (role) => {
    const user = authService.getStoredUser();
    if (!user || !user.role) return false;
    
    if (Array.isArray(user.role)) {
      return user.role.includes(role);
    }
    
    return user.role === role;
  }
};

export default authService; 