import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CourseDetails.css';

// Import the same mock data used in NextCourseSection
const mockCourses = [
  {
    id: 1,
    title: 'Comprehensive NExT Step 1 Preparation',
    description: 'Master theoretical concepts and clinical knowledge with our structured program designed for NExT Step 1 success.',
    fullDescription: `Our Comprehensive NExT Step 1 Preparation program is meticulously designed to help medical students excel in their examination. This course covers all major subjects and topics required for the NExT Step 1, with a focus on both theoretical knowledge and practical applications.

    Key Features:
    • Comprehensive coverage of all subjects
    • Regular mock tests and assessments
    • Interactive live sessions with expert faculty
    • Detailed study materials and notes
    • Practice questions and case studies
    • Performance tracking and analytics`,
    image: 'https://img.freepik.com/free-photo/medical-students-having-online-class-university_23-2149285268.jpg',
    duration: '6 months',
    enrolled: 1250,
    price: 49999,
    discountedPrice: 39999,
    isFeatured: true,
    highlights: [
      'Expert faculty from top medical institutions',
      'Comprehensive study materials and resources',
      'Regular mock tests and assessments',
      'Interactive live sessions and doubt clearing',
      'Clinical case discussions and analysis',
      'Performance tracking and personalized feedback'
    ],
    curriculum: [
      {
        title: 'Foundation Module',
        topics: ['Basic Sciences Review', 'Clinical Correlation', 'Integrated Approach']
      },
      {
        title: 'Subject-wise Coverage',
        topics: ['Medicine', 'Surgery', 'Obstetrics & Gynecology', 'Pediatrics']
      },
      {
        title: 'Clinical Skills',
        topics: ['Patient Communication', 'Clinical Examination', 'Case Presentation']
      },
      {
        title: 'Test Series',
        topics: ['Subject-wise Tests', 'Integrated Tests', 'Full Length Mock Exams']
      }
    ]
  },
  {
    id: 2,
    title: 'NExT Step 2 Clinical Skills Program',
    description: 'Enhance your clinical competencies through hands-on training and simulated patient interactions.',
    fullDescription: `The NExT Step 2 Clinical Skills Program is designed to prepare medical students for the practical aspects of the National Exit Test. This comprehensive program focuses on developing essential clinical skills through hands-on experience and simulated patient encounters.

    Key Features:
    • Hands-on clinical training
    • Simulated patient interactions
    • Clinical case discussions
    • Procedural skills workshops
    • Communication skills development
    • Clinical documentation practice`,
    image: 'https://img.freepik.com/free-photo/medical-students-wearing-white-coats-studying-together_23-2149285257.jpg',
    duration: '4 months',
    enrolled: 875,
    price: 44999,
    discountedPrice: null,
    isFeatured: false,
    highlights: [
      'Hands-on clinical training sessions',
      'Simulated patient encounters',
      'Clinical case discussions',
      'Procedural skills workshops',
      'Communication skills development',
      'Clinical documentation practice'
    ],
    curriculum: [
      {
        title: 'Clinical Skills Fundamentals',
        topics: ['Patient History Taking', 'Physical Examination', 'Clinical Documentation']
      },
      {
        title: 'Procedural Skills',
        topics: ['Basic Procedures', 'Emergency Procedures', 'Surgical Skills']
      },
      {
        title: 'Communication Skills',
        topics: ['Patient Communication', 'Team Communication', 'Clinical Presentation']
      },
      {
        title: 'Clinical Cases',
        topics: ['Case Analysis', 'Management Planning', 'Follow-up Care']
      }
    ]
  },
  {
    id: 3,
    title: 'NExT Fast Track Revision Course',
    description: 'Accelerated program focusing on high-yield topics and proven exam strategies for quick preparation.',
    fullDescription: `The NExT Fast Track Revision Course is an intensive program designed for students who need to quickly review and reinforce their knowledge before the National Exit Test. This course focuses on high-yield topics and proven exam strategies.

    Key Features:
    • Rapid review of key concepts
    • High-yield topic focus
    • Exam strategy sessions
    • Practice question banks
    • Mock tests and assessments
    • Performance analytics`,
    image: 'https://img.freepik.com/free-photo/medical-students-studying-together-library_23-2149285242.jpg',
    duration: '2 months',
    enrolled: 2100,
    price: 24999,
    discountedPrice: 19999,
    isFeatured: true,
    highlights: [
      'Rapid review of essential concepts',
      'Focus on high-yield topics',
      'Exam strategy development',
      'Extensive question practice',
      'Regular mock tests',
      'Performance tracking'
    ],
    curriculum: [
      {
        title: 'Rapid Review',
        topics: ['Key Concepts', 'High-Yield Topics', 'Common Questions']
      },
      {
        title: 'Exam Strategies',
        topics: ['Time Management', 'Question Analysis', 'Answer Techniques']
      },
      {
        title: 'Practice Sessions',
        topics: ['Subject-wise Practice', 'Mixed Questions', 'Full Mock Tests']
      },
      {
        title: 'Final Preparation',
        topics: ['Weak Area Review', 'Last Minute Tips', 'Exam Day Preparation']
      }
    ]
  },
  {
    id: 4,
    title: 'Subject-wise NExT Preparation',
    description: 'Focused modules covering individual subjects with comprehensive study materials and assessments.',
    fullDescription: `The Subject-wise NExT Preparation program offers detailed coverage of individual subjects, allowing students to master each topic thoroughly. This flexible program enables students to focus on their areas of interest or weakness.

    Key Features:
    • In-depth subject coverage
    • Flexible learning schedule
    • Subject-specific assessments
    • Expert faculty guidance
    • Comprehensive study materials
    • Regular progress tracking`,
    image: 'https://img.freepik.com/free-photo/medical-students-studying-with-teacher_23-2149285254.jpg',
    duration: 'Varies',
    enrolled: 1560,
    price: 34999,
    discountedPrice: null,
    isFeatured: false,
    highlights: [
      'Comprehensive subject coverage',
      'Flexible learning schedule',
      'Subject-specific assessments',
      'Expert faculty guidance',
      'Detailed study materials',
      'Progress tracking system'
    ],
    curriculum: [
      {
        title: 'Basic Sciences',
        topics: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology']
      },
      {
        title: 'Clinical Subjects',
        topics: ['Medicine', 'Surgery', 'Pediatrics', 'Obstetrics & Gynecology']
      },
      {
        title: 'Specialized Topics',
        topics: ['Radiology', 'Pharmacology', 'Microbiology', 'Community Medicine']
      },
      {
        title: 'Integration Module',
        topics: ['Case-based Learning', 'Clinical Integration', 'Subject Integration']
      }
    ]
  }
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        // Find the course in our mock data
        const foundCourse = mockCourses.find(c => c.id === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to load course details');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="course-details-loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="course-details-error">{error}</div>;
  }

  if (!course) {
    return <div className="course-not-found">Course not found</div>;
  }

  return (
    <div className="course-details-page">
      <div className="course-details-hero">
        <div className="container">
          <motion.div 
            className="course-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-meta">
              <span><i className="fas fa-clock"></i> {course.duration}</span>
              <span><i className="fas fa-users"></i> {course.enrolled.toLocaleString()} enrolled</span>
              {course.isFeatured && <span className="featured-badge">Featured</span>}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="course-details-grid">
          <motion.div 
            className="course-main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <section className="course-description">
              <h2>Course Overview</h2>
              <div className="description-content">
                {course.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="course-highlights">
              <h2>Course Highlights</h2>
              <ul className="highlights-list">
                {course.highlights.map((highlight, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <i className="fas fa-check-circle"></i>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </section>

            <section className="course-curriculum">
              <h2>Course Curriculum</h2>
              <div className="curriculum-list">
                {course.curriculum.map((module, index) => (
                  <motion.div 
                    key={index}
                    className="curriculum-module"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <h3>{module.title}</h3>
                    <ul>
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>

          <motion.div 
            className="course-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-pricing">
                {course.discountedPrice ? (
                  <>
                    <div className="price-tag">
                      <span className="original-price">₹{course.price.toLocaleString()}</span>
                      <span className="discounted-price">₹{course.discountedPrice.toLocaleString()}</span>
                    </div>
                    <div className="discount-badge">
                      {Math.round((1 - course.discountedPrice / course.price) * 100)}% OFF
                    </div>
                  </>
                ) : (
                  <div className="price-tag">
                    <span className="price">₹{course.price.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <button className="enroll-button">
                Enroll Now
              </button>
              <div className="course-features">
                <div className="feature">
                  <i className="fas fa-play-circle"></i>
                  <span>Online Classes</span>
                </div>
                <div className="feature">
                  <i className="fas fa-book"></i>
                  <span>Study Material</span>
                </div>
                <div className="feature">
                  <i className="fas fa-certificate"></i>
                  <span>Certificate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 