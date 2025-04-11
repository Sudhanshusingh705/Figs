import React from 'react';
import { Link } from 'react-router-dom';
import './Promotions.css';

const promotions = [
  {
    id: 1,
    title: 'NExT Preparatory Course',
    description: 'Get ready for the National Exit Test with our comprehensive preparation course.',
    icon: 'book-medical',
    link: '/next'
  },
  {
    id: 2,
    title: 'Free Trial Quiz',
    description: 'Try our sample quizzes for free and assess your knowledge level.',
    icon: 'file-alt',
    link: '/quizzes'
  },
  {
    id: 3,
    title: 'Online Counseling',
    description: 'Book a session with our education counselors to plan your career.',
    icon: 'comments',
    link: '/book-counseling'
  }
];

const Promotions = () => {
  return (
    <div className="promotions">
      <div className="promotions__container">
        {promotions.map((promo) => (
          <div key={promo.id} className="promotion-card">
            <div className="promotion-card__icon">
              <i className={`fas fa-${promo.icon}`}></i>
            </div>
            <div className="promotion-card__content">
              <h3 className="promotion-card__title">{promo.title}</h3>
              <p className="promotion-card__description">{promo.description}</p>
              <Link to={promo.link} className="promotion-card__link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions; 