import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import apiService from '../../../services/api';

const QuizForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    timeLimit: 30,
    passPercentage: 70,
    totalPoints: 100,
    randomizeQuestions: false,
    showCorrectAnswers: true,
    active: true,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);

  // Categories for the dropdown
  const categories = [
    'Programming',
    'Web Development',
    'Database',
    'Computer Science',
    'Mobile Development',
    'DevOps',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchQuiz();
    }
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch this data from your API
      // const response = await apiService.get(`/admin/quizzes/${id}`);
      // setFormData(response);

      // For now, we'll use mock data
      setTimeout(() => {
        setFormData({
          title: 'JavaScript Fundamentals',
          description: 'Test your knowledge of JavaScript basics including variables, functions, and control flow.',
          category: 'Programming',
          timeLimit: 30,
          passPercentage: 70,
          totalPoints: 100,
          randomizeQuestions: true,
          showCorrectAnswers: true,
          active: true,
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load quiz data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In a real app, you would update or create the quiz via your API
      if (isEditMode) {
        // await apiService.put(`/admin/quizzes/${id}`, formData);
        console.log('Updated quiz:', formData);
      } else {
        // await apiService.post('/admin/quizzes', formData);
        console.log('Created quiz:', formData);
      }

      // Show success message
      setAlert({
        type: 'success',
        message: `Quiz ${isEditMode ? 'updated' : 'created'} successfully!`,
      });

      // Redirect to quiz list after a short delay
      setTimeout(() => {
        navigate('/admin/quizzes');
      }, 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${isEditMode ? 'update' : 'create'} quiz`,
      });
      setSaving(false);
    }
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
        <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Quiz' : 'Create New Quiz'}</h2>
        <Button variant="light" onClick={() => navigate('/admin/quizzes')}>
          Cancel
        </Button>
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
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-2">
                <Input
                  label="Quiz Title"
                  name="title"
                  placeholder="Enter quiz title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter quiz description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  type="number"
                  label="Time Limit (minutes)"
                  name="timeLimit"
                  placeholder="Enter time limit in minutes"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Pass Percentage"
                  name="passPercentage"
                  placeholder="Enter passing percentage"
                  value={formData.passPercentage}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Total Points"
                  name="totalPoints"
                  placeholder="Enter total points"
                  value={formData.totalPoints}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="randomizeQuestions"
                      name="randomizeQuestions"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.randomizeQuestions}
                      onChange={handleChange}
                    />
                    <label htmlFor="randomizeQuestions" className="ml-2 block text-sm text-gray-700">
                      Randomize questions order
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="showCorrectAnswers"
                      name="showCorrectAnswers"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.showCorrectAnswers}
                      onChange={handleChange}
                    />
                    <label htmlFor="showCorrectAnswers" className="ml-2 block text-sm text-gray-700">
                      Show correct answers after submission
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="active"
                      name="active"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.active}
                      onChange={handleChange}
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                      Quiz is active (visible to users)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="light"
                onClick={() => navigate('/admin/quizzes')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                disabled={saving}
              >
                {isEditMode ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizForm; 