import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

/**
 * Protected Route component for authentication and authorization
 * 
 * Redirects to login page if user is not authenticated
 * For admin routes, also checks if user has admin role
 * 
 * @param {Object} props
 * @param {boolean} props.adminRequired - Whether admin role is required
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ adminRequired = false, children }) => {
  const { user, loading } = useAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return <Loading />;
  }
  
  // Check if user is authenticated (has an id or email)
  const isAuthenticated = user && (user.id || user.email || user._id);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // For admin routes, check if user has admin role
  if (adminRequired && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute; 