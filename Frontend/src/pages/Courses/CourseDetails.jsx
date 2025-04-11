import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CourseDetails.css';

// Import mock data from AllCoursesPage
const allCourses = [
  {
    id: 1,
    title: 'Comprehensive NExT Step 1 Preparation',
    description: 'Master theoretical concepts and clinical knowledge with our structured program designed for NExT Step 1 success.',
    fullDescription: 'Our comprehensive NExT Step 1 preparation program is meticulously designed to help medical students master both theoretical concepts and clinical knowledge. The program includes detailed study materials, regular assessments, and personalized feedback to ensure your success.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-online-class-university_23-2149285268.jpg',
    duration: '6 months',
    enrolled: 1250,
    price: 49999,
    discountedPrice: 39999,
    isFeatured: true,
    category: 'Step 1',
    rating: 4.8,
    highlights: [
      'Comprehensive subject coverage',
      'Regular mock tests',
      'Expert faculty guidance',
      'Interactive learning sessions',
      'Performance analytics'
    ],
    curriculum: [
      {
        title: 'Foundation Module',
        topics: ['Basic sciences review', 'Clinical correlations', 'Diagnostic principles']
      },
      {
        title: 'Core Concepts',
        topics: ['System-wise study', 'Pathology integration', 'Pharmacology essentials']
      },
      {
        title: 'Clinical Applications',
        topics: ['Case-based learning', 'Clinical scenarios', 'Patient management']
      }
    ]
  },
  // ... rest of the courses from AllCoursesPage
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch course details
    const fetchCourseDetails = () => {
      setLoading(true);
      // Find course from mock data
      const foundCourse = allCourses.find(c => c.id === parseInt(courseId));
      setCourse(foundCourse);
      setLoading(false);
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="course-details-loading">
        <div className="loader"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses/next" className="back-button">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <motion.div 
        className="course-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="course-hero-content">
          {course.isFeatured && (
            <motion.div 
              className="featured-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Featured Course
            </motion.div>
          )}
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span><i className="fas fa-clock"></i> Duration: {course.duration}</span>
            <span><i className="fas fa-users"></i> {course.enrolled.toLocaleString()} students enrolled</span>
            <span><i className="fas fa-star"></i> Rating: {course.rating}/5</span>
          </div>
        </div>
      </motion.div>

      <div className="course-details-container">
        <div className="course-main-content">
          <motion.section 
            className="course-overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Course Overview</h2>
            <p>{course.fullDescription || course.description}</p>
            <div className="overview-grid">
              <div className="overview-item">
                <h3>What You'll Learn</h3>
                <ul>
                  {(course.highlights || [
                    'Comprehensive understanding of NExT exam pattern',
                    'In-depth subject knowledge and practical skills',
                    'Clinical case solving and diagnostic approaches',
                    'Exam strategies and time management techniques'
                  ]).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="course-curriculum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Course Curriculum</h2>
            <div className="curriculum-content">
              {(course.curriculum || [
                {
                  title: 'Module 1: Foundation',
                  topics: ['Introduction to NExT examination', 'Core medical concepts review', 'Basic clinical skills assessment']
                },
                {
                  title: 'Module 2: Advanced Concepts',
                  topics: ['Specialized medical topics', 'Clinical case studies', 'Diagnostic procedures']
                },
                {
                  title: 'Module 3: Practical Training',
                  topics: ['Hands-on clinical practice', 'Patient interaction scenarios', 'Medical equipment handling']
                }
              ]).map((module, index) => (
                <div key={index} className="module">
                  <h3>{module.title}</h3>
                  <ul>
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.div 
          className="course-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="price-section">
              {course.discountedPrice ? (
                <>
                  <span className="original-price">₹{course.price.toLocaleString()}</span>
                  <span className="discounted-price">₹{course.discountedPrice.toLocaleString()}</span>
                  <span className="discount-badge">
                    {Math.round((1 - course.discountedPrice / course.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="price">₹{course.price.toLocaleString()}</span>
              )}
            </div>
            <button className="enroll-button">Enroll Now</button>
            <div className="course-includes">
              <h3>This Course Includes:</h3>
              <ul>
                <li><i className="fas fa-video"></i> HD Video Lectures</li>
                <li><i className="fas fa-book"></i> Comprehensive Study Material</li>
                <li><i className="fas fa-file-alt"></i> Mock Tests</li>
                <li><i className="fas fa-user-md"></i> Expert Faculty Support</li>
                <li><i className="fas fa-certificate"></i> Completion Certificate</li>
                <li><i className="fas fa-mobile-alt"></i> Mobile App Access</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails; 