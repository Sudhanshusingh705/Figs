import React from 'react';
import useAuth from '../../hooks/useAuth';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import './Dashboard.css';

const DashboardContainer = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;
  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="dashboard__error">
          <p>You need to be logged in to view your dashboard.</p>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on the user's role
  return user?.role === 'teacher' ? (
    <TeacherDashboard user={user} />
  ) : (
    <StudentDashboard user={user} />
  );
};

export default DashboardContainer; 