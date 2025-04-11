import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../Shared';
import './QuizSection.css';

const QuizSection = () => {
  return (
    <section className="quiz-section">
      <div className="container">
        <div className="section-header">
          <h2>Featured Medical Quizzes</h2>
          <p>Challenge yourself with our curated collection of medical quizzes designed to test and improve your knowledge</p>
        </div>
        
        <div className="featured-quizzes">
          {featuredQuizzes.map(quiz => (
            <div className="featured-quiz" key={quiz.id}>
              <div className="quiz-category">
                <span>{quiz.category}</span>
                {quiz.isNew && <Badge text="New" color="primary" size="sm" />}
              </div>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="quiz-stats">
                <div className="stat">
                  <i className="fas fa-question-circle"></i>
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="stat">
                  <i className="fas fa-users"></i>
                  <span>{quiz.attempts} Attempts</span>
                </div>
              </div>
              <Link to={`/quizzes/${quiz.id}`} className="quiz-link">
                Try Quiz <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="section-cta">
          <Link to="/quizzes" className="btn-all-quizzes">
            View All Quizzes
          </Link>
        </div>
      </div>
    </section>
  );
};

const featuredQuizzes = [
  {
    id: 1,
    title: "NEET Biology - Human Physiology",
    category: "Biology",
    description: "Test your knowledge of human anatomy, organ systems, and physiological processes.",
    questions: 50,
    attempts: 2500,
    isNew: false
  },
  {
    id: 2,
    title: "Medical Terminology Quiz",
    category: "Medical Basics",
    description: "Master essential medical terminology used in clinical settings and medical literature.",
    questions: 40,
    attempts: 1800,
    isNew: true
  },
  {
    id: 3,
    title: "Pharmacology Essentials",
    category: "Pharmacology",
    description: "Challenge yourself with questions on drug classifications, mechanisms, and clinical applications.",
    questions: 45,
    attempts: 1200,
    isNew: false
  }
];

export default QuizSection; 