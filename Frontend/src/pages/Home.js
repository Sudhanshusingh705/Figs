import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/home.css';

// Move the mock data outside the component
const getMockData = () => ({
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
          });

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(getMockData());
  const [error, setError] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    // Just set loading to false immediately - using mock data
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error && !content.blogs.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Error Loading Content</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerChildren}
                >
                  <motion.span 
                    className="hero-badge"
                    variants={fadeIn}
                  >
                    Medical Education Platform
                  </motion.span>
                  <motion.h1 
                    className="hero-title"
                    variants={fadeIn}
                  >
                    Empowering Medical Students for Success
                  </motion.h1>
                  <motion.p 
                    className="hero-description"
                    variants={fadeIn}
                  >
                    Comprehensive resources, practice tests, and courses designed 
                    specifically for medical students preparing for NEXT and other medical exams.
                  </motion.p>
                  <motion.div 
                    className="hero-buttons"
                    variants={fadeIn}
                  >
                    <Link to="/courses" className="btn btn-primary me-3">
                      Explore Courses
                    </Link>
                    <Link to="/register" className="btn btn-outline-primary">
                      Get Started
                    </Link>
                  </motion.div>
                </motion.div>
              </Col>
              <Col lg={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hero-image-container"
                >
                  <img 
                    src="/images/hero-image.jpg" 
                    alt="Medical students studying" 
                    className="hero-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Medical+Education';
                    }}
                  />
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* About Us Section */}
        <section className="about-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title">About Us</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Pioneering Excellence in Medical Education
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="about-image-container">
                    <img 
                      src="/images/about-us.jpg" 
                      alt="Our team of medical professionals" 
                      className="about-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=Medical+Professionals';
                      }}
                    />
                    <div className="about-image-shape"></div>
                  </div>
                </motion.div>
              </Col>
              
              <Col lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="about-subtitle">Leading the Way in Medical Education</h3>
                  <p className="about-text">
                    FIGS Medical Education is dedicated to revolutionizing how medical students prepare for examinations 
                    and advance their careers. Founded by a team of experienced medical professionals and educators, 
                    we understand the challenges faced by students in today's competitive healthcare landscape.
                  </p>
                  <p className="about-text">
                    Our mission is to provide comprehensive, accessible, and innovative learning resources that empower 
                    medical students to excel in their studies and professional endeavors. We specialize in NEXT exam preparation 
                    and continuous medical education through our extensive collection of courses, quizzes, mock tests, and study materials.
                  </p>
                  
                  <div className="about-stats">
                    <div className="about-stat-item">
                      <div className="stat-number">10,000+</div>
                      <div className="stat-label">Students</div>
                    </div>
                    <div className="about-stat-item">
                      <div className="stat-number">50+</div>
                      <div className="stat-label">Expert Instructors</div>
                    </div>
                    <div className="about-stat-item">
                      <div className="stat-number">95%</div>
                      <div className="stat-label">Success Rate</div>
                    </div>
                  </div>
                  
                  <Link to="/about" className="btn btn-primary about-cta">
                    Learn More About Us
                  </Link>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Quizzes Section */}
        <section className="quizzes-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title">Interactive Medical Quizzes</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Test your knowledge and reinforce learning with our diverse collection of medical quizzes
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <div className="quiz-carousel-container">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="quiz-carousel"
              >
                <div className="quiz-cards">
                  {content.quizzes.concat(content.quizzes).map((quiz, index) => (
                    <div className="quiz-card" key={`quiz-${quiz.id}-${index}`}>
                      <div className="quiz-card-image">
                        <img 
                          src={`/images/quizzes/quiz-${index % 5 + 1}.jpg`}
                          alt={quiz.title}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/300x200?text=Quiz+${index + 1}`;
                          }}
                        />
                        <div className="quiz-card-difficulty">{quiz.difficulty}</div>
                      </div>
                      <div className="quiz-card-content">
                        <h3 className="quiz-card-title">{quiz.title}</h3>
                        <p className="quiz-card-description">{quiz.description}</p>
                        <div className="quiz-card-meta">
                          <div className="quiz-meta-item">
                            <i className="fas fa-question-circle"></i>
                            <span>{quiz.totalQuestions} Questions</span>
                          </div>
                          <div className="quiz-meta-item">
                            <i className="fas fa-clock"></i>
                            <span>{quiz.timeLimit} Minutes</span>
                          </div>
                          <div className="quiz-meta-item">
                            <i className="fas fa-users"></i>
                            <span>{quiz.attempts} Attempts</span>
                          </div>
                        </div>
                        <div className="quiz-card-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`}></i>
                            ))}
                          </div>
                          <span className="rating-text">4.0 (24 reviews)</span>
                        </div>
                        <Link to={`/quizzes/${quiz.id}`} className="btn btn-primary quiz-card-button">
                          Start Quiz
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="carousel-controls">
                <button className="carousel-control-prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="carousel-control-next">
                  <i className="fas fa-chevron-right"></i>
                </button>
                    </div>
                  </div>
            
            <Row className="mt-5">
              <Col className="text-center">
                <Link to="/quizzes" className="btn btn-outline-primary btn-lg view-all-button">
                  View All Quizzes <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Mock Tests Section */}
        <section className="mock-tests-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title">Comprehensive Mock Tests</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Simulate real exam conditions with our meticulously crafted mock tests for NEXT and other medical exams
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <div className="mock-test-carousel-container">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mock-test-carousel"
              >
                <div className="mock-test-cards">
                  {content.mockTests.concat(content.mockTests).map((mockTest, index) => (
                    <div className="mock-test-card" key={`mock-test-${mockTest.id}-${index}`}>
                      <div className="mock-test-card-image">
                        <img 
                          src={`/images/mock-tests/mock-${index % 5 + 1}.jpg`}
                          alt={mockTest.title}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/300x200?text=Mock+Test+${index + 1}`;
                          }}
                        />
                        <div className="mock-test-card-badge">Exam Prep</div>
                      </div>
                      <div className="mock-test-card-content">
                        <h3 className="mock-test-card-title">{mockTest.title}</h3>
                        <p className="mock-test-card-description">{mockTest.description}</p>
                        <div className="mock-test-card-meta">
                          <div className="mock-test-meta-item">
                            <i className="fas fa-question-circle"></i>
                            <span>{mockTest.totalQuestions} Questions</span>
                          </div>
                          <div className="mock-test-meta-item">
                            <i className="fas fa-clock"></i>
                            <span>{mockTest.duration}</span>
                          </div>
                          <div className="mock-test-meta-item">
                            <i className="fas fa-users"></i>
                            <span>{mockTest.attempts} Attempts</span>
                          </div>
                        </div>
                        <div className="mock-test-card-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`}></i>
                            ))}
                          </div>
                          <span className="rating-text">4.2 (38 reviews)</span>
                        </div>
                        <div className="mock-test-card-actions">
                          <Link to={`/mock-tests/${mockTest.id}`} className="btn btn-primary mock-test-card-button">
                            Start Test
                          </Link>
                          <button className="btn btn-outline-secondary mock-test-view-details">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="carousel-controls mock-test-controls">
                <button className="carousel-control-prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="carousel-control-next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            
            <Row className="mt-5">
              <Col className="text-center">
                <Link to="/mock-tests" className="btn btn-outline-primary btn-lg view-all-button">
                  Explore All Mock Tests <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Courses Section */}
        <section className="courses-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title">Premium Medical Courses</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Master medical concepts with comprehensive courses taught by expert practitioners and educators
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <div className="course-carousel-container">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="course-carousel"
              >
                <div className="course-cards">
                  {content.courses.concat(content.courses).map((course, index) => (
                    <div className="course-card" key={`course-${course.id}-${index}`}>
                      <div className="course-card-image">
                        <img 
                          src={`/images/courses/course-${index % 5 + 1}.jpg`}
                          alt={course.title}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/300x200?text=Course+${index + 1}`;
                          }}
                        />
                        <div className="course-card-level">{course.level}</div>
                        <div className="course-card-price">₹3,999</div>
                      </div>
                      <div className="course-card-content">
                        <h3 className="course-card-title">{course.title}</h3>
                        <p className="course-card-description">{course.description}</p>
                        <div className="course-card-instructor">
                          <div className="instructor-avatar">
                            <img 
                              src={`/images/instructors/instructor-${index % 5 + 1}.jpg`}
                              alt={course.instructor}
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/50x50?text=Dr`;
                              }}
                            />
                          </div>
                          <div className="instructor-info">
                            <span className="instructor-name">Dr. {course.instructor}</span>
                            <span className="instructor-title">Medical Specialist</span>
                          </div>
                        </div>
                        <div className="course-card-meta">
                          <div className="course-meta-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>{course.duration}</span>
                          </div>
                          <div className="course-meta-item">
                            <i className="fas fa-book"></i>
                            <span>42 Lessons</span>
                          </div>
                          <div className="course-meta-item">
                            <i className="fas fa-users"></i>
                            <span>{course.students} Students</span>
                          </div>
                        </div>
                        <div className="course-card-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : i < 4.5 ? 'half-filled' : ''}`}></i>
                            ))}
                          </div>
                          <span className="rating-text">4.5 (68 reviews)</span>
                        </div>
                        <Link to={`/courses/${course.id}`} className="btn btn-primary course-card-button">
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="carousel-controls course-controls">
                <button className="carousel-control-prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="carousel-control-next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            
            <Row className="mt-5">
              <Col className="text-center">
                <Link to="/courses" className="btn btn-outline-primary btn-lg view-all-button">
                  Browse All Courses <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Study Materials Section */}
        <section className="study-materials-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title">Essential Study Materials</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Access high-quality study resources designed to enhance your medical education journey
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <Row>
              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="study-materials-intro"
                >
                  <h3 className="study-materials-title">Curated Learning Resources</h3>
                  <p className="study-materials-text">
                    Our study materials are meticulously crafted by experienced medical practitioners and educators 
                    to ensure accuracy, relevance, and comprehensiveness. From detailed notes to quick reference 
                    guides, we provide everything you need to succeed in your medical studies.
                  </p>
                  <ul className="study-materials-features">
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Comprehensive subject coverage</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Regularly updated content</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Downloadable for offline study</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Clinically relevant examples</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Visual aids and diagrams</span>
                    </li>
                  </ul>
                  <Link to="/study-materials" className="btn btn-primary study-materials-cta">
                    Explore All Materials
                  </Link>
                </motion.div>
              </Col>
              
              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="study-materials-showcase"
                >
                  <div className="study-materials-grid">
                    {content.studyMaterials.map((material, index) => (
                      <div className="study-material-item" key={`material-${material.id}`}>
                        <div className="study-material-icon">
                          {material.type === 'PDF' ? (
                            <i className="fas fa-file-pdf"></i>
                          ) : material.type === 'Flashcards' ? (
                            <i className="fas fa-layer-group"></i>
                          ) : (
                            <i className="fas fa-file-alt"></i>
                          )}
                        </div>
                        <div className="study-material-content">
                          <h4 className="study-material-title">{material.title}</h4>
                          <p className="study-material-description">{material.description}</p>
                          <div className="study-material-meta">
                            {material.pages && (
                              <span className="material-meta-item">
                                <i className="fas fa-book-open"></i> {material.pages} Pages
                              </span>
                            )}
                            {material.count && (
                              <span className="material-meta-item">
                                <i className="fas fa-clone"></i> {material.count} Cards
                              </span>
                            )}
                            <span className="material-meta-item">
                              <i className="fas fa-download"></i> {material.downloads} Downloads
                            </span>
                          </div>
                          <Link to={`/study-materials/${material.id}`} className="btn btn-sm btn-outline-primary download-btn">
                            Download <i className="fas fa-download ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Blogs and Articles Section */}
        <section className="blogs-articles-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center mb-5">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                  <h2 className="section-title">Latest Insights & Knowledge</h2>
                  <div className="section-title-underline"></div>
                  <p className="section-subtitle">
                    Stay updated with the latest medical advancements, exam tips, and educational resources
                  </p>
                </motion.div>
              </Col>
            </Row>
            
            <div className="content-tabs">
              <ul className="nav nav-tabs content-tabs-nav" id="contentTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link active" 
                    id="blogs-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#blogs-content" 
                    type="button"
                    aria-selected="true"
                  >
                    Featured Blogs
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link" 
                    id="articles-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#articles-content" 
                    type="button"
                    aria-selected="false"
                  >
                    Medical Articles
                  </button>
                </li>
              </ul>
              
              <div className="tab-content" id="contentTabsContent">
                {/* Blogs Tab */}
                <div className="tab-pane fade show active" id="blogs-content" role="tabpanel" aria-labelledby="blogs-tab">
                  <Row>
                    {content.blogs.map((blog, index) => (
                      <Col lg={4} md={6} className="mb-4" key={`blog-${blog.id}`}>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="blog-card"
                        >
                          <div className="blog-card-image">
                            <img 
                              src={`/images/blogs/blog-${index % 6 + 1}.jpg`}
                              alt={blog.title}
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/400x250?text=Blog+${index + 1}`;
                              }}
                            />
                            <div className="blog-category">{blog.category}</div>
                          </div>
                          <div className="blog-card-content">
                            <div className="blog-meta">
                              <span className="blog-author">
                                <i className="fas fa-user"></i> {blog.author}
                              </span>
                              <span className="blog-date">
                                <i className="fas fa-calendar-alt"></i> {formatDate(blog.createdAt)}
                              </span>
                              <span className="blog-read-time">
                                <i className="fas fa-clock"></i> {blog.readTime}
                              </span>
                            </div>
                            <h3 className="blog-title">
                              <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                            </h3>
                            <p className="blog-excerpt">{blog.excerpt}</p>
                            <Link to={`/blogs/${blog.slug}`} className="blog-read-more">
                              Read More <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-center mt-4">
                    <Link to="/blogs" className="btn btn-outline-primary btn-lg view-all-button">
                      View All Blogs <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
                
                {/* Articles Tab */}
                <div className="tab-pane fade" id="articles-content" role="tabpanel" aria-labelledby="articles-tab">
                  <Row>
                    {content.articles.map((article, index) => (
                      <Col lg={4} md={6} className="mb-4" key={`article-${article.id}`}>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="article-card"
                        >
                          <div className="article-card-image">
                            <img 
                              src={`/images/articles/article-${index % 6 + 1}.jpg`}
                              alt={article.title}
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/400x250?text=Article+${index + 1}`;
                              }}
                            />
                            <div className="article-difficulty">{article.difficulty}</div>
                          </div>
                          <div className="article-card-content">
                            <div className="article-category">{article.category}</div>
                            <h3 className="article-title">
                              <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                            </h3>
                            <p className="article-excerpt">{article.excerpt}</p>
                            <div className="article-meta">
                              <span className="article-time">
                                <i className="fas fa-clock"></i> {article.estimatedTime} read
                              </span>
                              <Link to={`/articles/${article.slug}`} className="article-read-more">
                                Read Article <i className="fas fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
                  <div className="text-center mt-4">
                    <Link to="/articles" className="btn btn-outline-primary btn-lg view-all-button">
                      View All Articles <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Call to Action Section */}
        <section className="cta-section">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="cta-container"
            >
              <Row className="align-items-center">
                <Col lg={8} md={7}>
                  <div className="cta-content">
                    <h2 className="cta-title">Ready to Excel in Your Medical Education?</h2>
                    <p className="cta-text">
                      Join thousands of successful medical students who have transformed their learning journey with our comprehensive platform.
                    </p>
                  </div>
                </Col>
                <Col lg={4} md={5} className="text-md-end">
                  <Link to="/register" className="btn btn-light btn-lg cta-button">
                    Get Started Now
                  </Link>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Home; 