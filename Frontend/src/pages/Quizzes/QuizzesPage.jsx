import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../components/Layout';
import { QuizSection } from '../../components/CourseSections';
import { Badge } from '../../components/Shared';
import './QuizzesPage.css';

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    if (quizzes.length > 0) {
      // Extract unique categories from quizzes
      const uniqueCategories = [...new Set(quizzes.map(quiz => quiz.category))];
      setCategories(uniqueCategories);
      
      // Filter quizzes based on selected category
      if (selectedCategory === 'all') {
        setFilteredQuizzes(quizzes);
      } else {
        setFilteredQuizzes(quizzes.filter(quiz => quiz.category === selectedCategory));
      }
    }
  }, [quizzes, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="quizzes-page">
      <Header />
      <div className="quizzes-page-container">
        <div className="quizzes-page-hero">
          <div className="quizzes-page-hero-content">
            <h1>Medical Entrance Test Quizzes</h1>
            <p>Practice and test your knowledge with our comprehensive medical entrance quizzes</p>
            <Badge text="Free & Premium" color="primary" size="lg" />
          </div>
        </div>
        
        <section className="quizzes-categories">
          <div className="container">
            <h2>Quiz Categories</h2>
            <div className="category-tabs">
              <button 
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All Quizzes
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        <section className="quizzes-list">
          <div className="container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading quizzes...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>Error loading quizzes: {error}</p>
              </div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="no-quizzes">
                <p>No quizzes found in this category.</p>
              </div>
            ) : (
              <>
                <div className="quizzes-grid">
                  {filteredQuizzes.map(quiz => (
                    <div className="quiz-card" key={quiz.id}>
                      <div className="quiz-header">
                        <h3>{quiz.title}</h3>
                        {quiz.isPremium ? (
                          <Badge text="Premium" color="warning" size="sm" />
                        ) : (
                          <Badge text="Free" color="success" size="sm" />
                        )}
                      </div>
                      <div className="quiz-content">
                        <p>{quiz.description}</p>
                        <div className="quiz-meta">
                          <span><i className="fas fa-question-circle"></i> {quiz.questionCount} questions</span>
                          <span><i className="fas fa-clock"></i> {quiz.timeLimit} minutes</span>
                          <span><i className="fas fa-user-graduate"></i> {quiz.attemptCount} attempts</span>
                        </div>
                      </div>
                      <div className="quiz-footer">
                        <button className="btn-take-quiz">Take Quiz</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        
        <section className="quiz-features">
          <div className="container">
            <h2>Why Practice with Our Quizzes?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3>Regular Updates</h3>
                <p>Our quizzes are regularly updated to align with the latest exam patterns and syllabus changes.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Performance Tracking</h3>
                <p>Track your progress over time with detailed analytics and performance reports.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-book-reader"></i>
                </div>
                <h3>Comprehensive Coverage</h3>
                <p>Covers all subjects and topics relevant to medical entrance examinations.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <h3>Detailed Explanations</h3>
                <p>Each question comes with detailed explanations to help you understand concepts better.</p>
              </div>
            </div>
          </div>
        </section>
        
        <QuizSection />
        
        <section className="quiz-membership">
          <div className="container">
            <div className="membership-content">
              <h2>Upgrade to Premium</h2>
              <p>Get access to all premium quizzes, detailed analysis, and personalized recommendations.</p>
              <div className="membership-tiers">
                <div className="membership-tier">
                  <h3>Monthly</h3>
                  <div className="price">₹999<span>/month</span></div>
                  <ul className="tier-features">
                    <li>Access to all premium quizzes</li>
                    <li>Detailed performance analytics</li>
                    <li>Personalized recommendations</li>
                    <li>24/7 support</li>
                  </ul>
                  <button className="btn-subscribe">Subscribe</button>
                </div>
                <div className="membership-tier featured">
                  <div className="tier-badge">Best Value</div>
                  <h3>Annual</h3>
                  <div className="price">₹7999<span>/year</span></div>
                  <div className="saving">Save ₹3989</div>
                  <ul className="tier-features">
                    <li>All monthly features</li>
                    <li>Priority access to new quizzes</li>
                    <li>Downloadable performance reports</li>
                    <li>1-on-1 coaching session</li>
                  </ul>
                  <button className="btn-subscribe">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// Mock data for quizzes (would be fetched from API in a real application)
const mockQuizzes = [
  {
    id: 1,
    title: 'NEET Biology - Cell Structure and Function',
    description: 'Test your knowledge of cell structure, organelles, and cellular processes.',
    category: 'Biology',
    questionCount: 50,
    timeLimit: 60,
    attemptCount: 1250,
    isPremium: false
  },
  {
    id: 2,
    title: 'NEET Chemistry - Organic Compounds',
    description: 'Practice questions on organic chemistry, reactions, and mechanisms.',
    category: 'Chemistry',
    questionCount: 45,
    timeLimit: 55,
    attemptCount: 980,
    isPremium: false
  },
  {
    id: 3,
    title: 'NEET Physics - Mechanics and Thermodynamics',
    description: 'Challenge yourself with problems on mechanics, energy, and thermodynamics.',
    category: 'Physics',
    questionCount: 40,
    timeLimit: 50,
    attemptCount: 850,
    isPremium: false
  },
  {
    id: 4,
    title: 'Advanced Biology - Molecular Genetics',
    description: 'In-depth questions on DNA replication, transcription, translation, and gene regulation.',
    category: 'Biology',
    questionCount: 35,
    timeLimit: 45,
    attemptCount: 620,
    isPremium: true
  },
  {
    id: 5,
    title: 'Advanced Chemistry - Coordination Compounds',
    description: 'Complex problems on coordination chemistry, bonding, and reactions.',
    category: 'Chemistry',
    questionCount: 30,
    timeLimit: 40,
    attemptCount: 540,
    isPremium: true
  },
  {
    id: 6,
    title: 'Advanced Physics - Electromagnetism',
    description: 'Challenging questions on electromagnetic fields, induction, and applications.',
    category: 'Physics',
    questionCount: 35,
    timeLimit: 45,
    attemptCount: 480,
    isPremium: true
  }
];

export default QuizzesPage; 