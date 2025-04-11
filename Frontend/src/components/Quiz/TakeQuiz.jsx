import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/quizzes/${quizId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch quiz');
        }
        
        const quizData = await response.json();
        setQuiz(quizData);
        
        // Initialize user answers array with null values (no answer selected)
        setUserAnswers(new Array(quizData.questions.length).fill(null));
        
        // Set timer based on quiz time limit (converting minutes to seconds)
        setTimeLeft(quizData.timeLimit * 60);
        
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the quiz');
        console.error('Fetch quiz error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNavigateToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const quizResults = {
        quizId,
        answers: userAnswers.map((optionIndex, questionIndex) => ({
          questionId: quiz.questions[questionIndex].id,
          selectedOptionIndex: optionIndex
        })),
        timeSpent: (quiz.timeLimit * 60) - timeLeft
      };
      
      const response = await fetch('/api/quiz-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizResults)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit quiz');
      }
      
      const resultData = await response.json();
      navigate(`/quizzes/results/${resultData.attemptId}`);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the quiz');
      console.error('Submit quiz error:', err);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="take-quiz-container">
        <div className="dashboard__loading">
          <div className="spinner"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="take-quiz-container">
        <div className="dashboard__error">
          <p>Error: {error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/quizzes')}>
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const currentQuestionData = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isWarningTime = timeLeft <= 60; // Warning when 1 minute or less

  return (
    <div className="take-quiz-container">
      <div className="take-quiz-header">
        <div className="container">
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
        </div>
      </div>
      
      <div className={`quiz-timer ${isWarningTime ? 'warning' : ''}`}>
        <span className="quiz-timer__icon">
          <i className="fas fa-clock"></i>
        </span>
        <span className="quiz-timer__time">{formatTime(timeLeft)}</span>
      </div>
      
      <div className="take-quiz-content container">
        {/* Question Navigation */}
        <div className="question-navigation">
          {quiz.questions.map((question, index) => (
            <div
              key={index}
              className={`question-nav-item ${index === currentQuestion ? 'active' : ''} ${userAnswers[index] !== null ? 'answered' : ''}`}
              onClick={() => handleNavigateToQuestion(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Current Question */}
        <div className="quiz-question">
          <p className="quiz-question__number">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
          <h3 className="quiz-question__text">{currentQuestionData.text}</h3>
          
          <div className="quiz-options">
            {currentQuestionData.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`quiz-option ${userAnswers[currentQuestion] === optionIndex ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQuestion, optionIndex)}
              >
                <input
                  type="radio"
                  id={`option-${optionIndex}`}
                  name="quiz-option"
                  checked={userAnswers[currentQuestion] === optionIndex}
                  onChange={() => handleAnswerSelect(currentQuestion, optionIndex)}
                  className="quiz-option__radio"
                />
                <label htmlFor={`option-${optionIndex}`} className="quiz-option__text">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="quiz-navigation">
          <button
            className="btn btn-outline-secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {isLastQuestion ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          )}
        </div>
        
        {/* Submit Button (always visible) */}
        {!isLastQuestion && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz Early'}
            </button>
            <p className="mt-2 small text-muted">
              Note: You can submit the quiz at any time, but unanswered questions will be marked as incorrect.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz; 