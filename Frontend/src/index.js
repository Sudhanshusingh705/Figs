import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

// Import route pages
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import StudentDashboard from './pages/StudentDashboard';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import NExTPage from './pages/NExT/NExTPage.jsx';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import AllCoursesPage from './pages/Courses/AllCoursesPage';

// Import Protected Route component
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a fallback UI for critical errors
const FallbackUI = () => (
  <div style={{ 
    padding: '20px', 
    textAlign: 'center', 
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '50px auto',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    color: '#721c24'
  }}>
    <h2>Something went wrong</h2>
    <p>The application encountered an error. Please try refreshing the page.</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Refresh Page
    </button>
  </div>
);

// Safe rendering function that wraps everything in error boundaries
const SafeRender = () => (
  <React.StrictMode>
    <ErrorBoundary fallback={<FallbackUI />}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="services" element={<Services />} />
              <Route path="next" element={<NExTPage />} />
              <Route path="courses/:courseId" element={<CourseDetails />} />
              <Route path="courses/next" element={<AllCoursesPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin/login" element={<AdminLogin />} />
              
              {/* Protected user routes */}
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected admin routes */}
              <Route 
                path="admin/dashboard" 
                element={
                  <ProtectedRoute adminRequired={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// Safely render the app with additional error handling
try {
  root.render(<SafeRender />);
} catch (error) {
  console.error('Failed to render application:', error);
  // Render minimal fallback in case of catastrophic error
  root.render(<FallbackUI />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 