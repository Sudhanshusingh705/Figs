import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const TeacherDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    quizzesCreated: 0,
    materialsUploaded: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch teacher stats
        const statsResponse = await fetch('/api/teacher/stats');
        const statsData = await statsResponse.json();
        if (!statsResponse.ok) throw new Error(statsData.message || 'Failed to fetch stats');
        
        // Fetch recent quizzes created by teacher
        const quizzesResponse = await fetch('/api/teacher/quizzes/recent');
        const quizzesData = await quizzesResponse.json();
        if (!quizzesResponse.ok) throw new Error(quizzesData.message || 'Failed to fetch quizzes');
        
        // Fetch study materials uploaded by teacher
        const materialsResponse = await fetch('/api/teacher/materials');
        const materialsData = await materialsResponse.json();
        if (!materialsResponse.ok) throw new Error(materialsData.message || 'Failed to fetch materials');
        
        setStats(statsData);
        setRecentQuizzes(quizzesData);
        setStudyMaterials(materialsData);
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching dashboard data');
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard__error">
          <p>Error: {error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="container">
          <h1 className="dashboard__title">Teacher Dashboard</h1>
          <p className="dashboard__welcome">Welcome back, {user?.name || 'Teacher'}!</p>
        </div>
      </div>

      <div className="dashboard__content container">
        {/* Stats Cards */}
        <div className="dashboard__stats">
          <div className="stat-card">
            <div className="stat-card__icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="stat-card__content">
              <p className="stat-card__title">Total Students</p>
              <h3 className="stat-card__value">{stats.totalStudents}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <i className="fas fa-book-open"></i>
            </div>
            <div className="stat-card__content">
              <p className="stat-card__title">Courses Created</p>
              <h3 className="stat-card__value">{stats.totalCourses}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <div className="stat-card__content">
              <p className="stat-card__title">Quizzes Created</p>
              <h3 className="stat-card__value">{stats.quizzesCreated}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="stat-card__content">
              <p className="stat-card__title">Materials Uploaded</p>
              <h3 className="stat-card__value">{stats.materialsUploaded}</h3>
            </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="dashboard__sections">
          {/* Recent Quizzes */}
          <div className="dashboard__section">
            <div className="section-header">
              <h3 className="section-title">Recent Quizzes</h3>
              <Link to="/teacher/quizzes" className="btn btn-sm btn-outline">
                View All
              </Link>
            </div>
            
            <div className="quiz-history">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="quiz-history__item">
                    <div className="quiz-history__info">
                      <h4 className="quiz-history__title">{quiz.title}</h4>
                      <p className="quiz-history__date">Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="quiz-history__score">
                      <span className="badge badge-success">
                        {quiz.totalAttempts} Attempts
                      </span>
                    </div>
                    <div className="quiz-history__actions">
                      <Link to={`/teacher/quizzes/${quiz.id}`} className="btn btn-sm btn-outline">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>You haven't created any quizzes yet.</p>
                  <Link to="/teacher/quizzes/create" className="btn btn-primary">
                    Create a Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Study Materials */}
          <div className="dashboard__section">
            <div className="section-header">
              <h3 className="section-title">Study Materials</h3>
              <Link to="/teacher/materials" className="btn btn-sm btn-outline">
                View All
              </Link>
            </div>
            
            <div className="materials-list">
              {studyMaterials.length > 0 ? (
                studyMaterials.map((material) => (
                  <div key={material.id} className="material-item">
                    <div className="material-item__icon">
                      <i className={
                        material.type === 'pdf' ? 'fas fa-file-pdf' :
                        material.type === 'video' ? 'fas fa-file-video' :
                        material.type === 'document' ? 'fas fa-file-word' :
                        'fas fa-file'
                      }></i>
                    </div>
                    <div className="material-item__info">
                      <h4 className="material-item__title">{material.title}</h4>
                      <p className="material-item__subject">{material.subject}</p>
                    </div>
                    <div className="material-item__actions">
                      <Link to={`/teacher/materials/${material.id}`} className="btn btn-sm btn-outline">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>You haven't uploaded any study materials yet.</p>
                  <Link to="/teacher/materials/upload" className="btn btn-primary">
                    Upload Materials
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard__section">
          <div className="section-header">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/teacher/quizzes/create" className="btn btn-primary btn-block">
                Create New Quiz
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/teacher/materials/upload" className="btn btn-primary btn-block">
                Upload Materials
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/teacher/students" className="btn btn-primary btn-block">
                View Students
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/teacher/reports" className="btn btn-primary btn-block">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 