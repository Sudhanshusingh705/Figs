import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Medical Courses',
      description: 'Comprehensive medical courses designed for healthcare professionals at all levels.',
      icon: 'fas fa-stethoscope',
      link: '/courses/medical'
    },
    {
      id: 2,
      title: 'NExT Exam Preparation',
      description: 'Specialized courses and resources to help you excel in the National Exit Test.',
      icon: 'fas fa-graduation-cap',
      link: '/next'
    },
    {
      id: 3,
      title: 'Assessment Quizzes',
      description: 'Interactive quizzes to test your knowledge and track your progress.',
      icon: 'fas fa-question-circle',
      link: '/quizzes'
    },
    {
      id: 4,
      title: 'Study Materials',
      description: 'High-quality study materials and resources for medical students and professionals.',
      icon: 'fas fa-book-medical',
      link: '/materials'
    },
    {
      id: 5,
      title: 'Expert Mentorship',
      description: 'One-on-one mentorship from experienced medical professionals.',
      icon: 'fas fa-user-md',
      link: '/mentorship'
    },
    {
      id: 6,
      title: 'Community Forums',
      description: 'Connect with peers, share experiences, and learn from others in the medical community.',
      icon: 'fas fa-users',
      link: '/community'
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-description">
              We offer a comprehensive range of educational services designed to support medical students and healthcare professionals throughout their careers.
            </p>
          </div>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to={service.link} className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <div className="services-cta-content">
            <h2 className="services-cta-title">Ready to get started?</h2>
            <p className="services-cta-description">
              Explore our services and find the right resources to support your medical education journey.
            </p>
            <div className="services-cta-buttons">
              <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 