import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSection.css';

const courses = [
  {
    id: 'edu1',
    title: 'Medical Entrance Exam',
    description: 'Comprehensive preparation for NEET and other medical entrance exams.',
    image: '/images/courses/medical-entrance.jpg',
    link: '/courses/medical-entrance'
  },
  {
    id: 'edu2',
    title: 'MBBS Study Materials',
    description: 'Complete study materials for MBBS students across all years.',
    image: '/images/courses/mbbs.jpg',
    link: '/courses/mbbs'
  },
  {
    id: 'edu3',
    title: 'PG Medical Preparation',
    description: 'Specialized courses for post-graduate medical entrance exams.',
    image: '/images/courses/pg-med.jpg',
    link: '/courses/pg-medical'
  }
];

const EducationSection = () => {
  return (
    <div className="course-section">
      <h3 className="course-section__title">Education Courses</h3>
      <div className="course-section__grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-card__image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="course-card__content">
              <h4 className="course-card__title">{course.title}</h4>
              <p className="course-card__description">{course.description}</p>
              <Link to={course.link} className="course-card__link">
                View Course <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection; 