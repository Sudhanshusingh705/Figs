import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalQuizzes: 0,
    averageScore: 0
  });
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  
  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be fetched from an API
    setStats({
      enrolledCourses: 5,
      completedCourses: 3,
      totalQuizzes: 12,
      averageScore: 85
    });
    
    setEnrolledCourses([
      { 
        id: 1, 
        title: 'Cardiology Fundamentals', 
        progress: 75,
        lastAccessed: '2023-04-01',
        instructor: 'Dr. Sarah Johnson'
      },
      { 
        id: 2, 
        title: 'NExT Exam Preparation', 
        progress: 30,
        lastAccessed: '2023-04-02',
        instructor: 'Dr. Michael Brown'
      },
      { 
        id: 3, 
        title: 'Neurology Basics', 
        progress: 90,
        lastAccessed: '2023-04-03',
        instructor: 'Dr. Emily Davis'
      },
      { 
        id: 4, 
        title: 'Pediatrics Advanced', 
        progress: 45,
        lastAccessed: '2023-04-04',
        instructor: 'Dr. Robert Wilson'
      },
      { 
        id: 5, 
        title: 'Surgery Techniques', 
        progress: 60,
        lastAccessed: '2023-04-05',
        instructor: 'Dr. Lisa Anderson'
      }
    ]);
    
    setRecentQuizzes([
      { 
        id: 1, 
        title: 'Cardiology Quiz', 
        score: 85,
        date: '2023-03-10',
        totalQuestions: 20
      },
      { 
        id: 2, 
        title: 'NExT Practice Test', 
        score: 78,
        date: '2023-03-12',
        totalQuestions: 50
      },
      { 
        id: 3, 
        title: 'Neurology Assessment', 
        score: 92,
        date: '2023-03-18',
        totalQuestions: 25
      },
      { 
        id: 4, 
        title: 'Pediatrics Knowledge Check', 
        score: 88,
        date: '2023-03-22',
        totalQuestions: 30
      },
      { 
        id: 5, 
        title: 'Surgery Skills Test', 
        score: 75,
        date: '2023-03-28',
        totalQuestions: 15
      }
    ]);
    
    setUpcomingExams([
      { 
        id: 1, 
        title: 'NExT Mock Exam 1', 
        date: '2023-05-15',
        duration: '3 hours',
        totalMarks: 150
      },
      { 
        id: 2, 
        title: 'Cardiology Final', 
        date: '2023-05-20',
        duration: '2 hours',
        totalMarks: 100
      },
      { 
        id: 3, 
        title: 'NExT Mock Exam 2', 
        date: '2023-06-01',
        duration: '3 hours',
        totalMarks: 150
      }
    ]);
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="student-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Student Dashboard</h1>
          <div className="dashboard-actions">
            <Link to="/courses" className="btn btn-primary">
              <i className="fas fa-book-medical"></i> Browse Courses
            </Link>
            <Link to="/quizzes" className="btn btn-primary">
              <i className="fas fa-question-circle"></i> Take Quiz
            </Link>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Enrolled Courses</h3>
              <p className="stat-value">{stats.enrolledCourses}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Completed Courses</h3>
              <p className="stat-value">{stats.completedCourses}</p>
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
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Average Score</h3>
              <p className="stat-value">{stats.averageScore}%</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Enrolled Courses</h2>
              <Link to="/courses" className="section-link">View All</Link>
            </div>
            <div className="course-grid">
              {enrolledCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-instructor">Instructor: {course.instructor}</p>
                    <p className="course-last-accessed">Last accessed: {formatDate(course.lastAccessed)}</p>
                  </div>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">{course.progress}% Complete</p>
                  </div>
                  <Link to={`/courses/${course.id}`} className="btn btn-secondary">
                    Continue Learning
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Quiz Results</h2>
              <Link to="/quizzes" className="section-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Score</th>
                    <th>Questions</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuizzes.map(quiz => (
                    <tr key={quiz.id}>
                      <td>{quiz.title}</td>
                      <td>
                        <span className={`score-badge score-${quiz.score >= 80 ? 'high' : quiz.score >= 60 ? 'medium' : 'low'}`}>
                          {quiz.score}%
                        </span>
                      </td>
                      <td>{quiz.totalQuestions}</td>
                      <td>{formatDate(quiz.date)}</td>
                      <td>
                        <Link to={`/quizzes/${quiz.id}/review`} className="action-btn">
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Exams</h2>
              <Link to="/exams" className="section-link">View All</Link>
            </div>
            <div className="exam-list">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="exam-card">
                  <div className="exam-info">
                    <h3 className="exam-title">{exam.title}</h3>
                    <div className="exam-details">
                      <p><i className="fas fa-calendar"></i> {formatDate(exam.date)}</p>
                      <p><i className="fas fa-clock"></i> {exam.duration}</p>
                      <p><i className="fas fa-star"></i> {exam.totalMarks} marks</p>
                    </div>
                  </div>
                  <Link to={`/exams/${exam.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 