import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import { API_ENDPOINTS } from '../../constants/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import useAuth from '../../hooks/useAuth';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuizDetails();
  }, [id]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`${API_ENDPOINTS.QUIZ.DETAIL}/${id}`);
      setQuiz(response.data);
      setTimeLeft(response.data.timeLimit * 60); // Convert minutes to seconds
      setError(null);
    } catch (err) {
      setError('Failed to fetch quiz details. Please try again later.');
      console.error('Error fetching quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (!user) {
      navigate('/login', { state: { from: `/quizzes/${id}` } });
      return;
    }
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      setLoading(true);
      const response = await apiService.post(`${API_ENDPOINTS.QUIZ.SUBMIT}/${id}`, {
        answers,
        timeSpent: quiz.timeLimit * 60 - timeLeft
      });
      setResult(response.data);
      setQuizSubmitted(true);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!quiz) return <div className="text-center p-4">Quiz not found.</div>;

  if (quizSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h2>
          <div className="mb-4">
            <p className="text-lg">Score: {result.score}%</p>
            <p className="text-gray-600">Correct Answers: {result.correctAnswers}</p>
            <p className="text-gray-600">Total Questions: {result.totalQuestions}</p>
            <p className="text-gray-600">Time Spent: {formatTime(quiz.timeLimit * 60 - timeLeft)}</p>
          </div>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
          <div className="mb-6">
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">Time Limit</p>
                <p>{quiz.timeLimit} minutes</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">Questions</p>
                <p>{quiz.questions.length} questions</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">Difficulty</p>
                <p className="capitalize">{quiz.difficulty}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">Category</p>
                <p className="capitalize">{quiz.category}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </h2>
          <div className="text-lg font-medium">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-4">{currentQuestionData.question}</p>
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionData._id, option)}
                className={`w-full p-3 text-left rounded ${
                  answers[currentQuestionData._id] === option
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                } border transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Previous
          </button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail; 