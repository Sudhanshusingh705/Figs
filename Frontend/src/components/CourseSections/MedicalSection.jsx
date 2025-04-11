import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSection.css';

const courses = [
  {
    id: 'med1',
    title: 'Clinical Skills Workshop',
    description: 'Hands-on training for essential clinical skills and procedures.',
    image: '/images/courses/clinical-skills.jpg',
    link: '/courses/clinical-skills'
  },
  {
    id: 'med2',
    title: 'Anatomy & Physiology',
    description: 'Comprehensive courses on human anatomy and physiological processes.',
    image: '/images/courses/anatomy.jpg',
    link: '/courses/anatomy'
  },
  {
    id: 'med3',
    title: 'Pharmacology Essentials',
    description: 'Learn about drug actions, interactions, and therapeutic applications.',
    image: '/images/courses/pharmacology.jpg',
    link: '/courses/pharmacology'
  }
];

const MedicalSection = () => {
  return (
    <div className="course-section">
      <h3 className="course-section__title">Medical Courses</h3>
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

export default MedicalSection; 