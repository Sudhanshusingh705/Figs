import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';
import { API_ENDPOINTS, LOCAL_STORAGE_KEYS } from '../../constants/api';
import '../../components/Auth/Auth.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        setLoginError('');
        
        // Use admin login endpoint
        const response = await apiService.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, formData);
        
        // Store the token and user data
        if (response.token) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
          localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.user));
          
          // Redirect to admin dashboard
          navigate('/admin/dashboard');
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Admin login error:', error);
        setLoginError(
          error.message || 'Login failed. Please check your admin credentials and try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card admin-auth-card">
        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">Access the administration dashboard</p>
        
        {loginError && <div className="auth-error-message">{loginError}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter admin email address"
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter admin password"
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          
          <button
            type="submit"
            className="auth-submit-btn admin-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Login as Admin'}
          </button>
        </form>
        
        <p className="auth-redirect">
          <button 
            type="button" 
            className="back-to-user-login" 
            onClick={() => navigate('/login')}
          >
            Back to User Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin; 