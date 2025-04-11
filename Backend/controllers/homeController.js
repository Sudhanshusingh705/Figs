const { AppError } = require('../utils/errorHandler');

/**
 * Get all content for the home page
 * @route GET /api/home/content
 * @access Public
 */
exports.getHomeContent = async (req, res, next) => {
  try {
    // Return mock data
    const mockData = {
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

    res.status(200).json({
      status: 'success',
      data: mockData
    });
  } catch (error) {
    next(new AppError('Error fetching home content', 500));
  }
}; 