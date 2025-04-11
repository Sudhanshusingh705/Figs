import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBook, FaQuestionCircle, FaNewspaper } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dashboardItems = [
    {
      id: 1,
      title: 'Manage Users',
      icon: <FaUsers className="dashboard-icon" />,
      link: '/admin/users',
      description: 'View and manage user accounts'
    },
    {
      id: 2,
      title: 'Manage Courses',
      icon: <FaBook className="dashboard-icon" />,
      link: '/admin/courses',
      description: 'Add, edit, or remove courses'
    },
    {
      id: 3,
      title: 'Manage Quizzes',
      icon: <FaQuestionCircle className="dashboard-icon" />,
      link: '/admin/quizzes',
      description: 'Create and manage quizzes'
    },
    {
      id: 4,
      title: 'Manage Articles',
      icon: <FaNewspaper className="dashboard-icon" />,
      link: '/admin/articles',
      description: 'Publish and manage articles'
    }
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
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

export default AdminDashboard; 