import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import apiService from '../../../services/apiService';

const MockTestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: 60,
    totalQuestions: 0,
    difficulty: 'Intermediate',
    passingPercentage: 70,
    instructions: '',
    isRandomized: false,
    showResults: true
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Database',
    'Frontend',
    'Backend',
    'Full Stack',
    'UI/UX Design',
    'QA Testing',
    'Cybersecurity',
    'Blockchain',
    'Game Development'
  ];

  const difficultyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchMockTest();
    }
  }, [id]);

  const fetchMockTest = async () => {
    setFetchLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        if (id === '1') {
          setFormData({
            title: 'Full Stack Developer Mock Interview',
            description: 'A comprehensive mock interview for full stack developer positions covering frontend, backend, and database concepts.',
            category: 'Web Development',
            duration: 120,
            totalQuestions: 50,
            difficulty: 'Advanced',
            passingPercentage: 75,
            instructions: 'Answer all questions. You can review your answers before submission.',
            isRandomized: true,
            showResults: true
          });
        } else if (id === '2') {
          setFormData({
            title: 'Python Data Science Assessment',
            description: 'Test your knowledge of Python for data science applications including pandas, numpy, and scikit-learn.',
            category: 'Data Science',
            duration: 90,
            totalQuestions: 40,
            difficulty: 'Intermediate',
            passingPercentage: 70,
            instructions: 'Complete all sections. Some questions may have multiple correct answers.',
            isRandomized: true,
            showResults: true
          });
        } else {
          setError('Mock test not found');
        }
        setFetchLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch mock test details');
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value === '' ? '' : Math.max(0, parseInt(value, 10) || 0)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Validation
    if (!formData.title.trim()) {
      setAlert({
        type: 'error',
        message: 'Title is required'
      });
      setSaving(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success alert
      setAlert({
        type: 'success',
        message: `Mock test ${isEditMode ? 'updated' : 'created'} successfully`
      });
      
      // Navigate after delay
      setTimeout(() => {
        navigate('/admin/mock-tests');
      }, 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${isEditMode ? 'update' : 'create'} mock test: ${err.message}`
      });
      setSaving(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center p-8">Loading mock test data...</div>;
  }

  if (error && isEditMode) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Mock Test' : 'Create New Mock Test'}
      </h1>

      {alert && (
        <div className="mb-4">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter mock test title"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
              placeholder="Enter mock test description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Percentage
            </label>
            <input
              type="number"
              name="passingPercentage"
              value={formData.passingPercentage}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              min="0"
              max="100"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
              placeholder="Instructions for test takers"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRandomized"
                name="isRandomized"
                checked={formData.isRandomized}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isRandomized" className="text-sm text-gray-700">
                Randomize questions order
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showResults"
                name="showResults"
                checked={formData.showResults}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="showResults" className="text-sm text-gray-700">
                Show results after completion
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/mock-tests')}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : isEditMode
                ? 'Update Mock Test'
                : 'Create Mock Test'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MockTestForm; 