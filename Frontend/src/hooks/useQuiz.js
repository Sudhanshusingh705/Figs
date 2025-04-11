import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

/**
 * Custom hook to access quiz context
 * 
 * Provides access to quiz data, current quiz state,
 * and quiz-related functions throughout the application.
 * 
 * @returns {Object} Quiz context values and methods
 */
export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
}; 