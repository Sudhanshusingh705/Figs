import React, { createContext, useState, useContext, useEffect } from 'react';
import quizService from '../services/quizService';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available quizzes
  const fetchQuizzes = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.getQuizzes(filters);
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  // Fetch quiz history for authenticated users
  const fetchQuizHistory = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.getQuizHistory();
      setQuizHistory(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch quiz history');
    } finally {
      setLoading(false);
    }
  };

  // Load quiz details by ID
  const loadQuiz = async (quizId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.getQuizById(quizId);
      setCurrentQuiz(data);
      setCurrentQuestion(0);
      setAnswers({});
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Start a quiz attempt
  const startQuiz = async (quizId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.startQuiz(quizId);
      setCurrentAttempt(data);
      // Load quiz details if not already loaded
      if (!currentQuiz || currentQuiz.id !== quizId) {
        await loadQuiz(quizId);
      }
      return data;
    } catch (err) {
      setError(err.message || 'Failed to start quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Submit an answer for the current question
  const submitAnswer = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  // Navigate to the next question
  const goToNextQuestion = () => {
    if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      return true;
    }
    return false;
  };

  // Navigate to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      return true;
    }
    return false;
  };

  // Submit the entire quiz
  const submitQuiz = async () => {
    if (!currentQuiz || !currentAttempt) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.submitQuiz(currentQuiz.id, answers);
      setResults(data);
      // Refresh quiz history after submission
      await fetchQuizHistory();
      return data;
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Reset current quiz state
  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentAttempt(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setError(null);
  };

  // Admin: Create a new quiz
  const createQuiz = async (quizData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.createQuiz(quizData);
      // Refresh quiz list
      await fetchQuizzes();
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Admin: Update an existing quiz
  const updateQuiz = async (quizId, quizData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizService.updateQuiz(quizId, quizData);
      // Refresh quiz list and current quiz if it's the one being updated
      await fetchQuizzes();
      if (currentQuiz && currentQuiz.id === quizId) {
        setCurrentQuiz(data);
      }
      return data;
    } catch (err) {
      setError(err.message || 'Failed to update quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Admin: Delete a quiz
  const deleteQuiz = async (quizId) => {
    setLoading(true);
    setError(null);
    try {
      await quizService.deleteQuiz(quizId);
      // Refresh quiz list and reset current quiz if it's the one being deleted
      await fetchQuizzes();
      if (currentQuiz && currentQuiz.id === quizId) {
        resetQuiz();
      }
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete quiz');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Load quiz history when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchQuizHistory();
    }
  }, [isAuthenticated]);

  const value = {
    quizzes,
    currentQuiz,
    currentQuestion,
    currentAttempt,
    answers,
    results,
    quizHistory,
    loading,
    error,
    fetchQuizzes,
    fetchQuizHistory,
    loadQuiz,
    startQuiz,
    submitAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuiz,
    resetQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;