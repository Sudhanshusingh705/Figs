import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from '../EnquiryForm/EnquiryForm';
import './QuizCard.css';
import { formatDuration } from '../../utils/helpers';

const QuizCard = ({ quiz }) => {
  const [showEnquiry, setShowEnquiry] = useState(false);
  
  const {
    id,
    title,
    description,
    image,
    duration,
    questionCount,
    difficulty,
    price,
    category,
    isFree,
    isPremium
  } = quiz;

  const handleEnquiryClick = (e) => {
    e.preventDefault();
    setShowEnquiry(true);
  };

  const closeEnquiry = () => {
    setShowEnquiry(false);
  };

  const getBadgeText = () => {
    if (isPremium) return 'Premium';
    if (isFree) return 'Free';
    return '';
  };

  const getBadgeClass = () => {
    if (isPremium) return 'quiz-card__badge quiz-card__badge--premium';
    if (isFree) return 'quiz-card__badge quiz-card__badge--free';
    return '';
  };

  const getQuestionsText = () => {
    return `${questionCount} ${questionCount === 1 ? 'question' : 'questions'}`;
  };

  const getDifficultyClass = () => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'quiz-card__difficulty quiz-card__difficulty--easy';
      case 'medium':
        return 'quiz-card__difficulty quiz-card__difficulty--medium';
      case 'hard':
        return 'quiz-card__difficulty quiz-card__difficulty--hard';
      default:
        return 'quiz-card__difficulty';
    }
  };

  return (
    <>
      <div className="quiz-card">
        {(isFree || isPremium) && (
          <span className={getBadgeClass()}>{getBadgeText()}</span>
        )}
        
        <div className="quiz-card__image">
          <img src={image} alt={title} />
          <div className="quiz-card__overlay"></div>
        </div>
        
        <div className="quiz-card__content">
          <h3 className="quiz-card__title">{title}</h3>
          <p className="quiz-card__description">{description}</p>
          
          <div className="quiz-card__meta">
            <span className="quiz-card__duration">
              <i className="far fa-clock"></i> {formatDuration(duration)}
            </span>
            <span className="quiz-card__questions">
              <i className="fas fa-question-circle"></i> {getQuestionsText()}
            </span>
            {difficulty && (
              <span className={getDifficultyClass()}>
                <i className="fas fa-signal"></i> {difficulty}
              </span>
            )}
          </div>
          
          <div className="quiz-card__footer">
            <div className="quiz-card__price">
              {isFree ? (
                <span className="quiz-card__price-free">Free</span>
              ) : (
                <>
                  <span className="quiz-card__price-amount">₹{price}</span>
                  {isPremium && <span className="quiz-card__price-info">Premium Access</span>}
                </>
              )}
            </div>
            
            {isFree ? (
              <Link to={`/quiz/${id}`} className="quiz-card__btn">
                Start Quiz
              </Link>
            ) : (
              <button 
                className="quiz-card__btn quiz-card__btn--secondary" 
                onClick={handleEnquiryClick}
              >
                Enroll Now
              </button>
            )}
          </div>
          
          {category && (
            <span className="quiz-card__category">
              <i className="fas fa-tag"></i> {category}
            </span>
          )}
        </div>
      </div>
      
      {showEnquiry && (
        <div className="quiz-enquiry-modal">
          <div className="quiz-enquiry-modal__content">
            <EnquiryForm quiz={quiz} onClose={closeEnquiry} />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizCard; 