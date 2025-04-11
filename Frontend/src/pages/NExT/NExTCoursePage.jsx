import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendar, FaClock, FaGraduationCap, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import './NExTCoursePage.css';

const NExTCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/next/course/${courseId}` } });
      return;
    }

    try {
      await courseService.enrollInCourse(courseId);
      navigate('/dashboard/student');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="next-course-loading">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="next-course-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/next')}>Back to Courses</button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="next-course-not-found">
        <h2>Course Not Found</h2>
        <p>The requested course could not be found.</p>
        <button onClick={() => navigate('/next')}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div className="next-course-page">
      <div className="next-course-header">
        <div className="next-course-banner">
          <img src={course.bannerImage} alt={course.title} />
        </div>
        <div className="next-course-title-section">
          <h1>{course.title}</h1>
          <p className="next-course-description">{course.description}</p>
        </div>
      </div>

      <div className="next-course-content">
        <div className="next-course-main">
          <section className="next-course-overview">
            <h2>Course Overview</h2>
            <div className="next-course-stats">
              <div className="stat-item">
                <FaCalendar />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="stat-item">
                <FaClock />
                <span>Hours per week: {course.hoursPerWeek}</span>
              </div>
              <div className="stat-item">
                <FaGraduationCap />
                <span>Level: {course.level}</span>
              </div>
              <div className="stat-item">
                <FaBook />
                <span>Modules: {course.moduleCount}</span>
              </div>
              <div className="stat-item">
                <FaChalkboardTeacher />
                <span>Instructor: {course.instructor}</span>
              </div>
            </div>
          </section>

          <section className="next-course-syllabus">
            <h2>Course Syllabus</h2>
            <div className="syllabus-modules">
              {course.modules.map((module, index) => (
                <div key={index} className="syllabus-module">
                  <h3>Module {index + 1}: {module.title}</h3>
                  <ul>
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="next-course-features">
            <h2>Course Features</h2>
            <ul className="features-list">
              {course.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="next-course-sidebar">
          <div className="next-course-enrollment">
            <div className="enrollment-details">
              <h3>Course Fee</h3>
              <p className="course-price">₹{course.price}</p>
              {course.originalPrice && (
                <p className="original-price">
                  <span>₹{course.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </span>
                </p>
              )}
            </div>
            <button 
              className="enroll-button"
              onClick={handleEnroll}
            >
              {user ? 'Enroll Now' : 'Login to Enroll'}
            </button>
            <div className="enrollment-features">
              <p>✓ Full lifetime access</p>
              <p>✓ Access on mobile and desktop</p>
              <p>✓ Certificate of completion</p>
              <p>✓ Practice tests included</p>
            </div>
          </div>

          {course.upcomingBatches && course.upcomingBatches.length > 0 && (
            <div className="next-course-batches">
              <h3>Upcoming Batches</h3>
              <ul>
                {course.upcomingBatches.map((batch, index) => (
                  <li key={index}>
                    <span className="batch-date">{batch.startDate}</span>
                    <span className="batch-seats">{batch.seatsLeft} seats left</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NExTCoursePage; 