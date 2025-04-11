import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../Shared';
import nextService from '../../services/nextService';
import './NextCourseSection.css';
import { motion } from 'framer-motion';

const mockCourses = [
  {
    id: 1,
    title: 'Comprehensive NExT Step 1 Preparation',
    description: 'Master theoretical concepts and clinical knowledge with our structured program designed for NExT Step 1 success.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-online-class-university_23-2149285268.jpg',
    duration: '6 months',
    enrolled: 1250,
    price: 49999,
    discountedPrice: 39999,
    isFeatured: true
  },
  {
    id: 2,
    title: 'NExT Step 2 Clinical Skills Program',
    description: 'Enhance your clinical competencies through hands-on training and simulated patient interactions.',
    image: 'https://img.freepik.com/free-photo/medical-students-wearing-white-coats-studying-together_23-2149285257.jpg',
    duration: '4 months',
    enrolled: 875,
    price: 44999,
    discountedPrice: null,
    isFeatured: false
  },
  {
    id: 3,
    title: 'NExT Fast Track Revision Course',
    description: 'Accelerated program focusing on high-yield topics and proven exam strategies for quick preparation.',
    image: 'https://img.freepik.com/free-photo/medical-students-studying-together-library_23-2149285242.jpg',
    duration: '2 months',
    enrolled: 2100,
    price: 24999,
    discountedPrice: 19999,
    isFeatured: true
  },
  {
    id: 4,
    title: 'Subject-wise NExT Preparation',
    description: 'Focused modules covering individual subjects with comprehensive study materials and assessments.',
    image: 'https://img.freepik.com/free-photo/medical-students-studying-with-teacher_23-2149285254.jpg',
    duration: 'Varies',
    enrolled: 1560,
    price: 34999,
    discountedPrice: null,
    isFeatured: false
  }
];

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} loading="lazy" />
        {course.isFeatured && (
          <div className="course-badge">Featured</div>
        )}
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-details">
          <div className="course-info">
            <span>
              <i className="fas fa-clock"></i>
              Duration: {course.duration}
            </span>
            <span>
              <i className="fas fa-users"></i>
              {course.enrolled.toLocaleString()} enrolled
            </span>
          </div>
          <div className="course-price">
            {course.discountedPrice ? (
              <>
                <span className="original-price">₹{course.price.toLocaleString()}</span>
                <span className="discounted-price">₹{course.discountedPrice.toLocaleString()}</span>
              </>
            ) : (
              <span className="price">₹{course.price.toLocaleString()}</span>
            )}
          </div>
          <Link to={`/courses/${course.id}`} className="btn-course">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const NextCourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setCourses(mockCourses);
        setLoading(false);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
        console.error('Error fetching NExT courses:', err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.course-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [courses]);

  if (loading) {
    return <div className="next-courses-loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="next-courses-error">{error}</div>;
  }

  return (
    <section className="next-courses-section">
      <div className="section-title">
        <h2>Our NExT Preparation Courses</h2>
        <p>
          Embark on your journey to NExT success with our comprehensive preparation courses. 
          Designed by expert medical educators, our programs combine in-depth subject knowledge 
          with practical clinical skills to ensure you excel in the National Exit Test.
        </p>
      </div>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <motion.div 
        className="view-all-link"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/courses/next"
          className="view-all-button"
        >
          View All Courses
        </Link>
      </motion.div>
    </section>
  );
};

export default NextCourseSection; 