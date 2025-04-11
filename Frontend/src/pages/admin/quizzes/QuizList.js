import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, quizId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch this data from your API
      // const response = await apiService.get('/admin/quizzes');
      // setQuizzes(response);
      
      // For now, we'll use mock data
      setTimeout(() => {
        setQuizzes([
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            category: 'Programming',
            totalQuestions: 20,
            timeLimit: 30,
            published: true,
            createdAt: '2023-04-05T10:30:00Z'
          },
          {
            id: 2,
            title: 'React Hooks Deep Dive',
            category: 'Web Development',
            totalQuestions: 15,
            timeLimit: 25,
            published: true,
            createdAt: '2023-04-04T14:45:00Z'
          },
          {
            id: 3,
            title: 'CSS Grid & Flexbox',
            category: 'Web Development',
            totalQuestions: 12,
            timeLimit: 20,
            published: false,
            createdAt: '2023-04-03T09:15:00Z'
          },
          {
            id: 4,
            title: 'Data Structures Basics',
            category: 'Computer Science',
            totalQuestions: 25,
            timeLimit: 40,
            published: true,
            createdAt: '2023-04-02T16:20:00Z'
          },
          {
            id: 5,
            title: 'SQL for Beginners',
            category: 'Database',
            totalQuestions: 18,
            timeLimit: 30,
            published: true,
            createdAt: '2023-04-01T11:00:00Z'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load quizzes');
      setLoading(false);
    }
  };

  const handleDeleteClick = (quizId) => {
    setDeleteModal({ isOpen: true, quizId });
  };

  const confirmDelete = async () => {
    try {
      // In a real app, you would delete the quiz via your API
      // await apiService.delete(`/admin/quizzes/${deleteModal.quizId}`);
      
      // For now, we'll just update the local state
      setQuizzes(quizzes.filter(quiz => quiz.id !== deleteModal.quizId));
      setAlert({ type: 'success', message: 'Quiz deleted successfully' });
      
      // Close the modal
      setDeleteModal({ isOpen: false, quizId: null });
      
      // Hide the alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to delete quiz' });
      setDeleteModal({ isOpen: false, quizId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, quizId: null });
  };

  const togglePublish = async (quizId, currentStatus) => {
    try {
      // In a real app, you would update the quiz via your API
      // await apiService.patch(`/admin/quizzes/${quizId}`, { published: !currentStatus });
      
      // For now, we'll just update the local state
      setQuizzes(quizzes.map(quiz => 
        quiz.id === quizId ? { ...quiz, published: !currentStatus } : quiz
      ));
      
      setAlert({ 
        type: 'success', 
        message: `Quiz ${!currentStatus ? 'published' : 'unpublished'} successfully` 
      });
      
      // Hide the alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to update quiz status' });
    }
  };

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
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
        <h2 className="text-2xl font-bold">Manage Quizzes</h2>
        <Link to="/admin/quizzes/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Quiz
          </Button>
        </Link>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          className="mb-4"
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">All Quizzes ({quizzes.length})</h3>
            <div className="flex w-64">
              <input
                type="text"
                placeholder="Search quizzes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Limit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{quiz.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{quiz.totalQuestions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{quiz.timeLimit} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(quiz.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          quiz.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {quiz.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/quizzes/${quiz.id}/questions`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Questions
                        </Link>
                        <Link
                          to={`/admin/quizzes/${quiz.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => togglePublish(quiz.id, quiz.published)}
                          className={`${
                            quiz.published
                              ? 'text-yellow-600 hover:text-yellow-900'
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {quiz.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(quiz.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan="7">
                    No quizzes found. {searchTerm && 'Try changing your search term.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        title="Confirm Delete"
        size="small"
      >
        <div>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this quiz? This action cannot be undone.
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
    </div>
  );
};

export default QuizList; 