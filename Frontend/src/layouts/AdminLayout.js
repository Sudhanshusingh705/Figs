import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // If not admin, show nothing while redirecting
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">
            Welcome, {user?.displayName || 'Admin'}
          </p>
        </div>
        <div className="py-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard Overview
            </div>
          </NavLink>

          <h3 className="mx-6 mt-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Education
          </h3>

          <NavLink
            to="/admin/quizzes"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Manage Quizzes
            </div>
          </NavLink>

          <NavLink
            to="/admin/mock-tests"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Manage Mock Tests
            </div>
          </NavLink>

          <NavLink
            to="/admin/study-materials"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Manage Study Materials
            </div>
          </NavLink>
          
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Manage Courses
            </div>
          </NavLink>
          
          <h3 className="mx-6 mt-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Content
          </h3>
          
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Manage Blogs
            </div>
          </NavLink>
          
          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Manage Articles
            </div>
          </NavLink>

          <h3 className="mx-6 mt-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            System
          </h3>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Manage Users
            </div>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `block px-6 py-2 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
              }`
            }
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </div>
          </NavLink>

          <div className="px-6 py-4 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 