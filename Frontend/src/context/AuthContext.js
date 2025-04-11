import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { API_ENDPOINTS, LOCAL_STORAGE_KEYS, ROUTES } from '../constants/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        const userData = await apiService.get(API_ENDPOINTS.USER.PROFILE);
        setUser(userData || {});
      } else {
        setUser({});
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser({});
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { token, refreshToken, user: userData } = response;

      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));

      setUser(userData || {});
      navigate(ROUTES.HOME);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      const { token, refreshToken, user: newUser } = response;

      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(newUser));

      setUser(newUser || {});
      navigate(ROUTES.HOME);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setUser({});
    navigate(ROUTES.LOGIN);
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await apiService.put(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData);
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await apiService.put(API_ENDPOINTS.USER.CHANGE_PASSWORD, passwordData);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 