import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalQuizzes: 0,
    activeUsers: 0
  });
  
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  
  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be fetched from an API
    setStats({
      totalUsers: 1250,
      totalCourses: 45,
      totalQuizzes: 120,
      activeUsers: 876
    });
    
    setRecentUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', date: '2023-04-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student', date: '2023-04-02' },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'student', date: '2023-04-03' },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'student', date: '2023-04-04' },
      { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'student', date: '2023-04-05' }
    ]);
    
    setRecentCourses([
      { id: 1, title: 'Cardiology Fundamentals', category: 'Medical', students: 245, date: '2023-03-15' },
      { id: 2, title: 'NExT Exam Preparation', category: 'NExT', students: 189, date: '2023-03-20' },
      { id: 3, title: 'Neurology Basics', category: 'Medical', students: 156, date: '2023-03-25' },
      { id: 4, title: 'Pediatrics Advanced', category: 'Medical', students: 132, date: '2023-03-30' },
      { id: 5, title: 'Surgery Techniques', category: 'Medical', students: 178, date: '2023-04-01' }
    ]);
    
    setRecentQuizzes([
      { id: 1, title: 'Cardiology Quiz', category: 'Medical', questions: 20, date: '2023-03-10' },
      { id: 2, title: 'NExT Practice Test', category: 'NExT', questions: 50, date: '2023-03-12' },
      { id: 3, title: 'Neurology Assessment', category: 'Medical', questions: 25, date: '2023-03-18' },
      { id: 4, title: 'Pediatrics Knowledge Check', category: 'Medical', questions: 30, date: '2023-03-22' },
      { id: 5, title: 'Surgery Skills Test', category: 'Medical', questions: 15, date: '2023-03-28' }
    ]);
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <div className="dashboard-actions">
            <Link to="/admin/users/new" className="btn btn-primary">
              <i className="fas fa-user-plus"></i> Add User
            </Link>
            <Link to="/admin/courses/new" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i> Add Course
            </Link>
            <Link to="/admin/quizzes/new" className="btn btn-primary">
              <i className="fas fa-question-circle"></i> Add Quiz
            </Link>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total Users</h3>
              <p className="stat-value">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book-medical"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total Courses</h3>
              <p className="stat-value">{stats.totalCourses}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total Quizzes</h3>
              <p className="stat-value">{stats.totalQuizzes}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Active Users</h3>
              <p className="stat-value">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Users</h2>
              <Link to="/admin/users" className="section-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{formatDate(user.date)}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/users/${user.id}`} className="action-btn">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button className="action-btn action-btn--delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Courses</h2>
              <Link to="/admin/courses" className="section-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Students</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCourses.map(course => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.category}</td>
                      <td>{course.students}</td>
                      <td>{formatDate(course.date)}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/courses/${course.id}`} className="action-btn">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button className="action-btn action-btn--delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Quizzes</h2>
              <Link to="/admin/quizzes" className="section-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Questions</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuizzes.map(quiz => (
                    <tr key={quiz.id}>
                      <td>{quiz.title}</td>
                      <td>{quiz.category}</td>
                      <td>{quiz.questions}</td>
                      <td>{formatDate(quiz.date)}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/quizzes/${quiz.id}`} className="action-btn">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button className="action-btn action-btn--delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 