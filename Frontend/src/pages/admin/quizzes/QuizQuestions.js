import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/api';

const QuizQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, questionId: null });
  const [addEditModal, setAddEditModal] = useState({ isOpen: false, question: null, isEdit: false });

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [id]);

  const fetchQuizAndQuestions = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch this data from your API
      // const quizData = await apiService.get(`/admin/quizzes/${id}`);
      // const questionsData = await apiService.get(`/admin/quizzes/${id}/questions`);
      // setQuiz(quizData);
      // setQuestions(questionsData);

      // For now, we'll use mock data
      setTimeout(() => {
        setQuiz({
          id: id,
          title: 'JavaScript Fundamentals',
          description: 'Test your knowledge of JavaScript basics including variables, functions, and control flow.',
          category: 'Programming',
        });
        
        setQuestions([
          {
            id: 1,
            question: 'What is the correct way to declare a variable in JavaScript?',
            type: 'multiple_choice',
            points: 5,
            options: [
              { id: 1, text: 'var name;', isCorrect: true },
              { id: 2, text: 'variable name;', isCorrect: false },
              { id: 3, text: 'v name;', isCorrect: false },
              { id: 4, text: 'let = name;', isCorrect: false },
            ],
          },
          {
            id: 2,
            question: 'Which of the following is NOT a JavaScript data type?',
            type: 'multiple_choice',
            points: 5,
            options: [
              { id: 1, text: 'Number', isCorrect: false },
              { id: 2, text: 'String', isCorrect: false },
              { id: 3, text: 'Character', isCorrect: true },
              { id: 4, text: 'Boolean', isCorrect: false },
            ],
          },
          {
            id: 3,
            question: 'What will be the output of: console.log(typeof([]))?',
            type: 'multiple_choice',
            points: 10,
            options: [
              { id: 1, text: 'array', isCorrect: false },
              { id: 2, text: 'object', isCorrect: true },
              { id: 3, text: 'undefined', isCorrect: false },
              { id: 4, text: 'null', isCorrect: false },
            ],
          },
          {
            id: 4,
            question: 'Explain how closures work in JavaScript.',
            type: 'text',
            points: 15,
            sampleAnswer: 'A closure is the combination of a function and the lexical environment within which that function was declared. Closures allow a function to access variables from an enclosing scope even after it leaves the scope in which it was declared.',
          },
          {
            id: 5,
            question: 'What is the purpose of the "use strict" directive in JavaScript?',
            type: 'text',
            points: 10,
            sampleAnswer: 'The "use strict" directive enables strict mode in JavaScript. It helps catch common coding mistakes and "unsafe" actions, prevents the use of certain error-prone features, and optimizes code execution in some JavaScript engines.',
          },
        ]);
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load quiz data');
      setLoading(false);
    }
  };

  const handleDeleteClick = (questionId) => {
    setDeleteModal({ isOpen: true, questionId });
  };

  const confirmDelete = async () => {
    try {
      // In a real app, you would delete the question via your API
      // await apiService.delete(`/admin/quizzes/${id}/questions/${deleteModal.questionId}`);
      
      // For now, we'll just update the local state
      setQuestions(questions.filter(q => q.id !== deleteModal.questionId));
      setAlert({ type: 'success', message: 'Question deleted successfully' });
      
      // Close the modal
      setDeleteModal({ isOpen: false, questionId: null });
      
      // Hide the alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to delete question' });
      setDeleteModal({ isOpen: false, questionId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, questionId: null });
  };

  const handleAddQuestion = () => {
    setAddEditModal({
      isOpen: true,
      question: {
        question: '',
        type: 'multiple_choice',
        points: 5,
        options: [
          { id: 1, text: '', isCorrect: false },
          { id: 2, text: '', isCorrect: false },
          { id: 3, text: '', isCorrect: false },
          { id: 4, text: '', isCorrect: false },
        ],
        sampleAnswer: '',
      },
      isEdit: false,
    });
  };

  const handleEditQuestion = (question) => {
    setAddEditModal({
      isOpen: true,
      question: { ...question },
      isEdit: true,
    });
  };

  const closeAddEditModal = () => {
    setAddEditModal({ isOpen: false, question: null, isEdit: false });
  };

  const saveQuestion = (questionData) => {
    if (addEditModal.isEdit) {
      // Update existing question
      setQuestions(
        questions.map((q) => (q.id === questionData.id ? questionData : q))
      );
      setAlert({ type: 'success', message: 'Question updated successfully' });
    } else {
      // Add new question with a new ID
      const newQuestion = {
        ...questionData,
        id: Math.max(0, ...questions.map((q) => q.id)) + 1,
      };
      setQuestions([...questions, newQuestion]);
      setAlert({ type: 'success', message: 'Question added successfully' });
    }
    
    closeAddEditModal();
    
    // Hide the alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  const QuestionForm = ({ question, onSave, onCancel }) => {
    const [formData, setFormData] = useState(question);
    const [optionIdCounter, setOptionIdCounter] = useState(
      Math.max(0, ...(question.options?.map((o) => o.id) || [0])) + 1
    );

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

    const handleOptionChange = (id, field, value) => {
      setFormData({
        ...formData,
        options: formData.options.map((option) =>
          option.id === id ? { ...option, [field]: value } : option
        ),
      });
    };

    const handleCorrectOptionChange = (id) => {
      setFormData({
        ...formData,
        options: formData.options.map((option) => ({
          ...option,
          isCorrect: option.id === id,
        })),
      });
    };

    const addOption = () => {
      setFormData({
        ...formData,
        options: [
          ...formData.options,
          { id: optionIdCounter, text: '', isCorrect: false },
        ],
      });
      setOptionIdCounter(optionIdCounter + 1);
    };

    const removeOption = (id) => {
      setFormData({
        ...formData,
        options: formData.options.filter((option) => option.id !== id),
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              name="type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="text">Text Answer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              name="question"
              rows="3"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your question"
              value={formData.question}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points
            </label>
            <input
              type="number"
              name="points"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Points for correct answer"
              value={formData.points}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {formData.type === 'multiple_choice' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Answer Options
              </label>
              {formData.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="correctOption"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={option.isCorrect}
                    onChange={() => handleCorrectOptionChange(option.id)}
                    required
                  />
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Option text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(option.id, 'text', e.target.value)
                    }
                    required
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => removeOption(option.id)}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={addOption}
              >
                <svg
                  className="-ml-0.5 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Option
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Answer (for grading reference)
              </label>
              <textarea
                name="sampleAnswer"
                rows="3"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter a sample correct answer"
                value={formData.sampleAnswer}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Question
          </Button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <nav className="text-sm mb-2">
            <Link to="/admin/quizzes" className="text-gray-500 hover:text-gray-700">
              Quizzes
            </Link>{' '}
            / <span className="font-medium text-gray-900">{quiz.title}</span>
          </nav>
          <h2 className="text-2xl font-bold">Manage Quiz Questions</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="light" onClick={() => navigate(`/admin/quizzes/${id}/edit`)}>
            Edit Quiz Details
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Question
          </Button>
        </div>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          className="mb-4"
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Quiz Information</h3>
          </div>
        </div>
        <div className="p-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.title}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.category}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{quiz.description}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Questions ({questions.length})</h3>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new question.</p>
            <div className="mt-6">
              <Button variant="primary" onClick={handleAddQuestion}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Question
              </Button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {questions.map((question, index) => (
              <li key={question.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        Q{index + 1}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        {question.points} {question.points === 1 ? 'point' : 'points'}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {question.type === 'multiple_choice' ? 'Multiple Choice' : 'Text Answer'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-900 font-medium">{question.question}</p>

                    {question.type === 'multiple_choice' ? (
                      <div className="mt-2 space-y-2">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <span
                              className={`flex items-center justify-center h-5 w-5 rounded-full ${
                                option.isCorrect
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-400'
                              } mr-2`}
                            >
                              {option.isCorrect && (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-sm text-gray-700">{option.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-gray-500">
                        <p className="font-medium">Sample Answer:</p>
                        <p className="mt-1 italic">{question.sampleAnswer}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(question.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        title="Confirm Delete"
        size="small"
      >
        <div>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this question? This action cannot be undone.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="light" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={addEditModal.isOpen}
        onClose={closeAddEditModal}
        title={`${addEditModal.isEdit ? 'Edit' : 'Add'} Question`}
        size="large"
      >
        {addEditModal.question && (
          <QuestionForm
            question={addEditModal.question}
            onSave={saveQuestion}
            onCancel={closeAddEditModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default QuizQuestions; 