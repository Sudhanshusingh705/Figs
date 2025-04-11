import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizCard from '../QuizCard/QuizCard';
import { useQuiz } from '../../hooks/useQuiz';
import './QuizSection.css';

const QuizSection = () => {
  const { quizzes, loading, error, fetchQuizzes } = useQuiz();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  
  const categories = [
    { id: 'all', name: 'All Quizzes' },
    { id: 'medical', name: 'Medical' },
    { id: 'clinical', name: 'Clinical' },
    { id: 'next', name: 'NExT Exam' },
    { id: 'free', name: 'Free Quizzes' }
  ];
  
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);
  
  useEffect(() => {
    if (quizzes && quizzes.length > 0) {
      if (activeCategory === 'all') {
        setFilteredQuizzes(quizzes);
      } else if (activeCategory === 'free') {
        setFilteredQuizzes(quizzes.filter(quiz => quiz.isFree));
      } else {
        setFilteredQuizzes(quizzes.filter(quiz => quiz.category?.toLowerCase() === activeCategory.toLowerCase()));
      }
    }
  }, [quizzes, activeCategory]);
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  if (loading) {
    return (
      <section className="quiz-section">
        <div className="container">
          <div className="quiz-section__loading">
            <div className="loader"></div>
            <p>Loading quizzes...</p>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="quiz-section">
        <div className="container">
          <div className="quiz-section__error">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button 
              className="quiz-section__btn" 
              onClick={() => fetchQuizzes()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="quiz-section">
      <div className="container">
        <div className="quiz-section__header">
          <h2 className="quiz-section__title">
            Explore Our <span>Assessment Quizzes</span>
          </h2>
          <p className="quiz-section__subtitle">
            Test your knowledge, identify gaps, and improve your medical expertise with our carefully designed quizzes
          </p>
        </div>
        
        <div className="quiz-section__categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`quiz-section__category ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {filteredQuizzes.length > 0 ? (
          <div className="quiz-section__grid">
            {filteredQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="quiz-section__empty">
            <i className="fas fa-search"></i>
            <h3>No quizzes found</h3>
            <p>We couldn't find any quizzes in this category. Please try another category or check back later.</p>
          </div>
        )}
        
        <div className="quiz-section__footer">
          <Link to="/quizzes" className="quiz-section__more-link">
            View All Quizzes <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuizSection; 