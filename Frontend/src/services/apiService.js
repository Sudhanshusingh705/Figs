import axios from 'axios';

// Base API URL - change this to your actual backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    },
    
    register: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    
    forgotPassword: async (email) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
    
    resetPassword: async (token, newPassword) => {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    },
    
    logout: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    },
    
    getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    
    getToken: () => {
      return localStorage.getItem('auth_token');
    },
    
    isAuthenticated: () => {
      return !!localStorage.getItem('auth_token');
    }
  },
  
  // Quiz endpoints
  quizzes: {
    getAll: async (params) => {
      const response = await api.get('/quizzes', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/quizzes/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/quizzes/${id}`);
      return response.data;
    },
    
    create: async (quizData) => {
      const response = await api.post('/quizzes', quizData);
      return response.data;
    },
    
    update: async (id, quizData) => {
      const response = await api.put(`/quizzes/${id}`, quizData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/quizzes/${id}`);
      return response.data;
    },
    
    togglePublish: async (id, status) => {
      const response = await api.patch(`/quizzes/${id}/publish`, { published: status });
      return response.data;
    },
    
    // Question management
    getQuestions: async (quizId) => {
      const response = await api.get(`/quizzes/${quizId}/questions`);
      return response.data;
    },
    
    addQuestion: async (quizId, questionData) => {
      const response = await api.post(`/quizzes/${quizId}/questions`, questionData);
      return response.data;
    },
    
    updateQuestion: async (quizId, questionId, questionData) => {
      const response = await api.put(`/quizzes/${quizId}/questions/${questionId}`, questionData);
      return response.data;
    },
    
    deleteQuestion: async (quizId, questionId) => {
      const response = await api.delete(`/quizzes/${quizId}/questions/${questionId}`);
      return response.data;
    },
    
    // Taking quizzes
    startQuiz: async (quizId) => {
      const response = await api.post(`/quizzes/${quizId}/start`);
      return response.data;
    },
    
    submitAnswer: async (quizId, attemptId, questionId, answer) => {
      const response = await api.post(`/quizzes/${quizId}/attempts/${attemptId}/answer`, {
        questionId,
        answer
      });
      return response.data;
    },
    
    finishQuiz: async (quizId, attemptId) => {
      const response = await api.post(`/quizzes/${quizId}/attempts/${attemptId}/finish`);
      return response.data;
    }
  },
  
  // Mock Test endpoints
  mockTests: {
    getAll: async (params) => {
      const response = await api.get('/mock-tests', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/mock-tests/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/mock-tests/${id}`);
      return response.data;
    },
    
    create: async (mockTestData) => {
      const response = await api.post('/mock-tests', mockTestData);
      return response.data;
    },
    
    update: async (id, mockTestData) => {
      const response = await api.put(`/mock-tests/${id}`, mockTestData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/mock-tests/${id}`);
      return response.data;
    },
    
    togglePublish: async (id, status) => {
      const response = await api.patch(`/mock-tests/${id}/publish`, { published: status });
      return response.data;
    }
  },
  
  // Study Materials endpoints
  studyMaterials: {
    getAll: async (params) => {
      const response = await api.get('/study-materials', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/study-materials/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/study-materials/${id}`);
      return response.data;
    },
    
    create: async (formData) => {
      // For file uploads, use formData
      const response = await api.post('/study-materials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    update: async (id, formData) => {
      // For file uploads, use formData
      const response = await api.put(`/study-materials/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/study-materials/${id}`);
      return response.data;
    },
    
    download: async (id) => {
      const response = await api.get(`/study-materials/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    }
  },
  
  // Course endpoints
  courses: {
    getAll: async (params) => {
      const response = await api.get('/courses', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/courses/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    },
    
    create: async (courseData) => {
      const response = await api.post('/courses', courseData);
      return response.data;
    },
    
    update: async (id, courseData) => {
      const response = await api.put(`/courses/${id}`, courseData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    },
    
    togglePublish: async (id, status) => {
      const response = await api.patch(`/courses/${id}/publish`, { published: status });
      return response.data;
    },
    
    // Lesson management
    getLessons: async (courseId) => {
      const response = await api.get(`/courses/${courseId}/lessons`);
      return response.data;
    },
    
    addLesson: async (courseId, lessonData) => {
      const response = await api.post(`/courses/${courseId}/lessons`, lessonData);
      return response.data;
    },
    
    updateLesson: async (courseId, lessonId, lessonData) => {
      const response = await api.put(`/courses/${courseId}/lessons/${lessonId}`, lessonData);
      return response.data;
    },
    
    deleteLesson: async (courseId, lessonId) => {
      const response = await api.delete(`/courses/${courseId}/lessons/${lessonId}`);
      return response.data;
    },
    
    // Enrollment
    enroll: async (courseId) => {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    },
    
    getEnrollments: async () => {
      const response = await api.get('/user/enrollments');
      return response.data;
    }
  },
  
  // Blog endpoints
  blogs: {
    getAll: async (params) => {
      const response = await api.get('/blogs', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/blogs/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    },
    
    getBySlug: async (slug) => {
      const response = await api.get(`/blogs/slug/${slug}`);
      return response.data;
    },
    
    create: async (formData) => {
      // For file uploads (featured image), use formData
      const response = await api.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    update: async (id, formData) => {
      // For file uploads (featured image), use formData
      const response = await api.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/blogs/${id}`);
      return response.data;
    },
    
    togglePublish: async (id, status) => {
      const response = await api.patch(`/blogs/${id}/publish`, { published: status });
      return response.data;
    },
    
    toggleFeatured: async (id, status) => {
      const response = await api.patch(`/blogs/${id}/feature`, { featured: status });
      return response.data;
    }
  },
  
  // Article endpoints
  articles: {
    getAll: async (params) => {
      const response = await api.get('/articles', { params });
      return response.data;
    },
    
    getFeatured: async () => {
      const response = await api.get('/articles/featured');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    },
    
    getBySlug: async (slug) => {
      const response = await api.get(`/articles/slug/${slug}`);
      return response.data;
    },
    
    create: async (formData) => {
      // For file uploads (featured image), use formData
      const response = await api.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    update: async (id, formData) => {
      // For file uploads (featured image), use formData
      const response = await api.put(`/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    },
    
    togglePublish: async (id, status) => {
      const response = await api.patch(`/articles/${id}/publish`, { published: status });
      return response.data;
    },
    
    toggleFeatured: async (id, status) => {
      const response = await api.patch(`/articles/${id}/feature`, { featured: status });
      return response.data;
    }
  },
  
  // User management
  users: {
    getAll: async (params) => {
      const response = await api.get('/users', { params });
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/users/${id}`);
      return response.data;
    },
    
    create: async (userData) => {
      const response = await api.post('/users', userData);
      return response.data;
    },
    
    update: async (id, userData) => {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    },
    
    updateProfile: async (userData) => {
      const response = await api.put('/users/profile', userData);
      return response.data;
    },
    
    changePassword: async (passwords) => {
      const response = await api.put('/users/change-password', passwords);
      return response.data;
    }
  },
  
  // Dashboard endpoints
  dashboard: {
    getStats: async () => {
      const response = await api.get('/dashboard/stats');
      return response.data;
    },
    
    getAdminStats: async () => {
      const response = await api.get('/dashboard/admin-stats');
      return response.data;
    },
    
    getUserActivity: async () => {
      const response = await api.get('/dashboard/user-activity');
      return response.data;
    },
    
    getRecentContent: async () => {
      const response = await api.get('/dashboard/recent-content');
      return response.data;
    }
  },
  
  // Home page content
  home: {
    getAllContent: async () => {
      // Return mock data directly instead of making an API call
      return {
        blogs: [
          {
            id: 1,
            title: 'Getting Started with React Hooks',
            slug: 'getting-started-with-react-hooks',
            excerpt: 'Learn how to use React Hooks to simplify your functional components.',
            category: 'React',
            author: 'John Doe',
            readTime: '5 min',
            createdAt: '2023-05-15',
            featured: true
          },
          {
            id: 2,
            title: 'Understanding JavaScript Promises',
            slug: 'understanding-javascript-promises',
            excerpt: 'A comprehensive guide to JavaScript Promises and async/await.',
            category: 'JavaScript',
            author: 'Jane Smith',
            readTime: '8 min',
            createdAt: '2023-04-28',
            featured: true
          }
        ],
        articles: [
          {
            id: 1,
            title: 'Introduction to Data Structures',
            slug: 'introduction-to-data-structures',
            excerpt: 'Learn the fundamental data structures that every programmer should know.',
            category: 'Computer Science',
            difficulty: 'Beginner',
            estimatedTime: '15 min',
            featured: true
          },
          {
            id: 2,
            title: 'Machine Learning Fundamentals',
            slug: 'machine-learning-fundamentals',
            excerpt: 'An introduction to the basic concepts and algorithms in machine learning.',
            category: 'Artificial Intelligence',
            difficulty: 'Intermediate',
            estimatedTime: '30 min',
            featured: true
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'JavaScript Fundamentals Quiz',
            description: 'Test your knowledge of JavaScript basics, including variables, functions, and loops.',
            totalQuestions: 20,
            timeLimit: 30,
            difficulty: 'Beginner',
            attempts: 256
          },
          {
            id: 2,
            title: 'Advanced React Concepts',
            description: 'Challenge your understanding of advanced React patterns and hooks.',
            totalQuestions: 15,
            timeLimit: 25,
            difficulty: 'Advanced',
            attempts: 124
          }
        ],
        mockTests: [
          {
            id: 1,
            title: 'NEXT Medical Entrance Full Mock Test',
            description: 'Complete simulation of the NEXT medical entrance exam with all sections.',
            totalQuestions: 180,
            duration: '3 hours',
            attempts: 340
          },
          {
            id: 2,
            title: 'NEXT Anatomy Section Test',
            description: 'Focused test on Anatomy concepts for NEXT exam preparation.',
            totalQuestions: 60,
            duration: '1 hour',
            attempts: 215
          }
        ],
        courses: [
          {
            id: 1,
            title: 'React.js Complete Course',
            description: 'Learn React.js from scratch and build modern, interactive web applications.',
            instructor: 'John Doe',
            level: 'Intermediate',
            duration: '12 weeks',
            students: 356
          },
          {
            id: 2,
            title: 'Node.js Backend Development',
            description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
            instructor: 'Jane Smith',
            level: 'Advanced',
            duration: '10 weeks',
            students: 214
          }
        ],
        studyMaterials: [
          {
            id: 1,
            title: 'Complete Anatomy Notes',
            description: 'Comprehensive study notes covering all essential anatomy topics for medical exams.',
            type: 'PDF',
            pages: 120,
            downloads: 450
          },
          {
            id: 2,
            title: 'Biochemistry Flashcards',
            description: 'Quick reference flashcards for biochemistry pathways and concepts.',
            type: 'Flashcards',
            count: 200,
            downloads: 380
          }
        ]
      };
    }
  }
};

export default apiService; 