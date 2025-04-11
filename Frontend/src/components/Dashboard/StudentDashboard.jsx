import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaQuestionCircle, FaChartLine, FaBookmark } from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const dashboardItems = [
    {
      id: 1,
      title: 'My Courses',
      icon: <FaBook className="dashboard-icon" />,
      link: '/student/courses',
      description: 'Access your enrolled courses'
    },
    {
      id: 2,
      title: 'Practice Quizzes',
      icon: <FaQuestionCircle className="dashboard-icon" />,
      link: '/student/quizzes',
      description: 'Take practice quizzes'
    },
    {
      id: 3,
      title: 'Progress Tracking',
      icon: <FaChartLine className="dashboard-icon" />,
      link: '/student/progress',
      description: 'View your learning progress'
    },
    {
      id: 4,
      title: 'Saved Articles',
      icon: <FaBookmark className="dashboard-icon" />,
      link: '/student/articles',
      description: 'Access your bookmarked articles'
    }
  ];

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <div className="dashboard-grid">
        {dashboardItems.map(item => (
          <Link to={item.link} key={item.id} className="dashboard-card">
            <div className="card-icon">{item.icon}</div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard; 