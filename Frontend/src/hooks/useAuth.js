import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * 
 * Provides access to user data, authentication status,
 * and authentication-related functions throughout the application.
 * 
 * @returns {Object} Authentication context values and methods
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Provide a default empty context if used outside of AuthProvider
  if (!context) {
    console.warn('useAuth hook used outside of AuthProvider. Using default values.');
    return {
      user: {},
      loading: false,
      login: () => console.warn('Auth not initialized'),
      register: () => console.warn('Auth not initialized'),
      logout: () => console.warn('Auth not initialized'),
      updateProfile: () => console.warn('Auth not initialized'),
      changePassword: () => console.warn('Auth not initialized')
    };
  }
  
  return context;
};

export default useAuth; 