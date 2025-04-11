import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layout components
import App from './App';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import NotFound from './pages/NotFound.jsx';
import NExTPage from './pages/NExT';
import AllCoursesPage from './pages/Courses/AllCoursesPage';
import CourseDetails from './pages/Courses/CourseDetails';

// User pages
import StudentDashboard from './pages/StudentDashboard';
import UserProfile from './pages/UserProfile';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLayout from './pages/admin/AdminLayout';
import ManageQuizzes from './pages/admin/ManageQuizzes';
import ManageMockTests from './pages/admin/ManageMockTests';
import ManageStudyMaterials from './pages/admin/ManageStudyMaterials';
import ManageCourses from './pages/admin/ManageCourses';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageArticles from './pages/admin/ManageArticles';
import ManageUsers from './pages/admin/ManageUsers';
import AdminSettings from './pages/admin/AdminSettings';

// Define all routes
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services', element: <Services /> },
      { path: 'next', element: <NExTPage /> },
      { path: 'courses/next', element: <AllCoursesPage /> },
      { path: 'courses/next/:courseId', element: <CourseDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'admin/login', element: <AdminLogin /> },
      
      // Protected user routes
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'profile', 
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ) 
      },
      
      // Protected admin routes
      { 
        path: 'admin',
        element: (
          <ProtectedRoute adminRequired={true}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'quizzes/*', element: <ManageQuizzes /> },
          { path: 'mock-tests/*', element: <ManageMockTests /> },
          { path: 'study-materials/*', element: <ManageStudyMaterials /> },
          { path: 'courses/*', element: <ManageCourses /> },
          { path: 'blogs/*', element: <ManageBlogs /> },
          { path: 'articles/*', element: <ManageArticles /> },
          { path: 'users', element: <ManageUsers /> },
          { path: 'settings', element: <AdminSettings /> }
        ]
      },
      
      // Catch-all route for 404
      { path: '*', element: <NotFound /> }
    ]
  }
];

export default routes; 