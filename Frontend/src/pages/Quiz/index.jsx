import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/useQuiz';
import { useAuth } from '../../hooks/useAuth';
import './Quiz.css';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    fetchQuizById, 
    startQuizAttempt, 
    submitQuizAnswer,
    submitQuiz,
    currentQuiz, 
    currentAttempt,
    currentQuestion,
    loading,
    error 
  } = useQuiz();
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  
  // Fetch quiz on page load
  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId, fetchQuizById]);
  
  // Setup timer when quiz attempt starts
  useEffect(() => {
    if (currentAttempt && currentAttempt.timeLimit && !quizCompleted) {
      const endTime = new Date(currentAttempt.startTime).getTime() + (currentAttempt.timeLimit * 60 * 1000);
      
      const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance <= 0) {
          clearInterval(timerInterval);
          setTimeLeft(0);
          handleTimeUp();
        } else {
          setTimeLeft(Math.floor(distance / 1000));
        }
      }, 1000);
      
      return () => clearInterval(timerInterval);
    }
  }, [currentAttempt]);
  
  const handleStartQuiz = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/quiz/${quizId}` } });
      return;
    }
    
    try {
      await startQuizAttempt(quizId);
    } catch (err) {
      console.error('Failed to start quiz:', err);
    }
  };
  
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };
  
  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;
    
    setIsSubmitting(true);
    
    try {
      const isLastQuestion = currentQuestion.isLast;
      
      await submitQuizAnswer(
        currentAttempt.id,
        currentQuestion.id,
        selectedAnswer
      );
      
      setSelectedAnswer(null);
      
      if (isLastQuestion) {
        const results = await submitQuiz(currentAttempt.id);
        setQuizCompleted(true);
        setQuizResults(results);
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTimeUp = async () => {
    if (currentAttempt && !quizCompleted) {
      setIsSubmitting(true);
      
      try {
        const results = await submitQuiz(currentAttempt.id);
        setQuizCompleted(true);
        setQuizResults(results);
      } catch (err) {
        console.error('Failed to submit quiz on timeout:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const formatTime = (seconds) => {
    if (!seconds) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  if (loading) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-page__loading">
            <div className="loader"></div>
            <p>Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-page__error">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Error Loading Quiz</h2>
            <p>{error}</p>
            <Link to="/quizzes" className="quiz-page__btn">
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentQuiz) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-page__not-found">
            <i className="fas fa-search"></i>
            <h2>Quiz Not Found</h2>
            <p>The quiz you're looking for doesn't exist or has been removed.</p>
            <Link to="/quizzes" className="quiz-page__btn">
              Browse All Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Quiz results/completion screen
  if (quizCompleted && quizResults) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-page__results">
            <div className="quiz-page__results-header">
              <h2>Quiz Completed!</h2>
              <p>You've completed the {currentQuiz.title}</p>
            </div>
            
            <div className="quiz-page__score">
              <div className="quiz-page__score-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${quizResults.scorePercentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    {quizResults.scorePercentage}%
                  </text>
                </svg>
              </div>
              
              <div className="quiz-page__score-details">
                <p>
                  <strong>Score:</strong> {quizResults.score} / {quizResults.totalPoints}
                </p>
                <p>
                  <strong>Correct Answers:</strong> {quizResults.correctAnswers} of {quizResults.totalQuestions}
                </p>
                <p>
                  <strong>Time Taken:</strong> {quizResults.timeTaken} minutes
                </p>
              </div>
            </div>
            
            {quizResults.passingScore && (
              <div className={`quiz-page__pass-status ${quizResults.passed ? 'passed' : 'failed'}`}>
                <i className={`fas fa-${quizResults.passed ? 'check-circle' : 'times-circle'}`}></i>
                <p>
                  {quizResults.passed 
                    ? 'Congratulations! You have passed the quiz.' 
                    : `Sorry, you didn't pass. The passing score is ${quizResults.passingScore}%.`}
                </p>
              </div>
            )}
            
            <div className="quiz-page__actions">
              <Link to={`/quiz/${quizId}/review`} className="quiz-page__btn quiz-page__btn--outline">
                Review Answers
              </Link>
              <Link to="/quizzes" className="quiz-page__btn">
                More Quizzes
              </Link>
              {!quizResults.passed && (
                <button 
                  className="quiz-page__btn quiz-page__btn--secondary" 
                  onClick={handleStartQuiz}
                >
                  Retry Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Quiz not started yet (intro screen)
  if (!currentAttempt) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-page__intro">
            <div className="quiz-page__intro-header">
              <h1>{currentQuiz.title}</h1>
              {currentQuiz.category && (
                <span className="quiz-page__category">{currentQuiz.category}</span>
              )}
            </div>
            
            <div className="quiz-page__intro-content">
              <div className="quiz-page__image">
                <img src={currentQuiz.image} alt={currentQuiz.title} />
              </div>
              
              <div className="quiz-page__info">
                <div className="quiz-page__description">
                  <h3>Quiz Description</h3>
                  <p>{currentQuiz.description}</p>
                </div>
                
                <div className="quiz-page__meta">
                  <div className="quiz-page__meta-item">
                    <i className="fas fa-question-circle"></i>
                    <span>{currentQuiz.questionCount} Questions</span>
                  </div>
                  <div className="quiz-page__meta-item">
                    <i className="fas fa-clock"></i>
                    <span>{currentQuiz.duration} Minutes</span>
                  </div>
                  {currentQuiz.difficulty && (
                    <div className="quiz-page__meta-item">
                      <i className="fas fa-signal"></i>
                      <span>{currentQuiz.difficulty}</span>
                    </div>
                  )}
                  {currentQuiz.passingScore && (
                    <div className="quiz-page__meta-item">
                      <i className="fas fa-award"></i>
                      <span>Pass: {currentQuiz.passingScore}%</span>
                    </div>
                  )}
                </div>
                
                <div className="quiz-page__instructions">
                  <h3>Instructions</h3>
                  <ul>
                    <li>Read each question carefully before answering.</li>
                    <li>Once you submit an answer, you cannot change it.</li>
                    <li>You must complete the quiz within the allocated time.</li>
                    <li>Don't refresh the page during the quiz.</li>
                    {currentQuiz.passingScore && (
                      <li>You need {currentQuiz.passingScore}% to pass this quiz.</li>
                    )}
                  </ul>
                </div>
                
                <div className="quiz-page__start">
                  <button 
                    className="quiz-page__btn quiz-page__btn--primary" 
                    onClick={handleStartQuiz}
                  >
                    Start Quiz
                  </button>
                  <Link to="/quizzes" className="quiz-page__btn quiz-page__btn--outline">
                    Back to Quizzes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Quiz in progress
  return (
    <div className="quiz-page">
      <div className="container">
        <div className="quiz-page__header">
          <h2>{currentQuiz.title}</h2>
          
          <div className="quiz-page__progress">
            <div className="quiz-page__progress-text">
              Question {currentQuestion.number} of {currentQuiz.questionCount}
            </div>
            <div className="quiz-page__progress-bar">
              <div 
                className="quiz-page__progress-fill" 
                style={{ width: `${(currentQuestion.number / currentQuiz.questionCount) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {timeLeft !== null && (
            <div className={`quiz-page__timer ${timeLeft < 60 ? 'quiz-page__timer--warning' : ''}`}>
              <i className="fas fa-clock"></i>
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        
        <div className="quiz-page__question-container">
          <div className="quiz-page__question">
            <h3>{currentQuestion.text}</h3>
            
            {currentQuestion.image && (
              <div className="quiz-page__question-image">
                <img src={currentQuestion.image} alt="Question" />
              </div>
            )}
          </div>
          
          <div className="quiz-page__answers">
            {currentQuestion.answers.map(answer => (
              <div 
                key={answer.id}
                className={`quiz-page__answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(answer.id)}
              >
                <div className="quiz-page__answer-indicator">
                  {selectedAnswer === answer.id ? <i className="fas fa-check-circle"></i> : ''}
                </div>
                <div className="quiz-page__answer-text">
                  {answer.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="quiz-page__actions">
            <button 
              className="quiz-page__btn quiz-page__btn--primary"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : currentQuestion.isLast ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;