import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import apiService from '../../../services/apiService';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    price: '',
    discountPrice: '',
    instructor: '',
    duration: '',
    thumbnail: null,
    requirements: [''],
    objectives: [''],
    isPublished: false
  });

  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Mobile Development',
    'DevOps',
    'Data Science',
    'Machine Learning',
    'Computer Science',
    'Database',
    'Cloud Computing',
    'Cybersecurity',
    'Game Development',
    'Blockchain',
    'Design',
    'Project Management'
  ];

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'All Levels'
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    setFetchLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        if (id === '1') {
          setFormData({
            title: 'React.js Complete Course',
            description: 'Learn React.js from scratch and build modern, interactive web applications. This course covers everything from basics to advanced concepts including hooks, context API, and Redux.',
            category: 'Frontend',
            level: 'Intermediate',
            price: '49.99',
            discountPrice: '39.99',
            instructor: 'John Doe',
            duration: '12 weeks',
            thumbnail: null,
            requirements: [
              'Basic knowledge of HTML, CSS, and JavaScript',
              'Understanding of ES6 features',
              'Node.js and npm installed on your computer'
            ],
            objectives: [
              'Understand React fundamentals and JSX',
              'Build single-page applications with React Router',
              'Manage state effectively with hooks and context API',
              'Integrate REST APIs with React applications',
              'Deploy React applications to production'
            ],
            isPublished: true
          });
          setCurrentThumbnail({
            url: 'https://example.com/react-course-thumbnail.jpg',
            name: 'react-course-thumbnail.jpg'
          });
        } else if (id === '2') {
          setFormData({
            title: 'Node.js Backend Development',
            description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn RESTful API design, authentication, and deployment.',
            category: 'Backend',
            level: 'Advanced',
            price: '59.99',
            discountPrice: '49.99',
            instructor: 'Jane Smith',
            duration: '10 weeks',
            thumbnail: null,
            requirements: [
              'JavaScript fundamentals',
              'Understanding of asynchronous programming',
              'Basic knowledge of databases'
            ],
            objectives: [
              'Build RESTful APIs with Express.js',
              'Implement authentication and authorization',
              'Work with MongoDB and Mongoose',
              'Handle file uploads and processing',
              'Deploy Node.js applications to cloud platforms'
            ],
            isPublished: true
          });
          setCurrentThumbnail({
            url: 'https://example.com/nodejs-course-thumbnail.jpg',
            name: 'nodejs-course-thumbnail.jpg'
          });
        } else {
          setError('Course not found');
        }
        setFetchLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch course details');
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
    if (value === '' || !isNaN(value)) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        thumbnail: file
      }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentThumbnail({
          url: reader.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayItemChange = (index, field, value) => {
    setFormData(prevData => {
      const newArray = [...prevData[field]];
      newArray[index] = value;
      return {
        ...prevData,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index)
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
    
    if (!formData.category) {
      setAlert({
        type: 'error',
        message: 'Category is required'
      });
      setSaving(false);
      return;
    }
    
    if (!formData.price) {
      setAlert({
        type: 'error',
        message: 'Price is required'
      });
      setSaving(false);
      return;
    }
    
    try {
      // Filter out empty items from arrays
      const cleanedFormData = {
        ...formData,
        requirements: formData.requirements.filter(item => item.trim() !== ''),
        objectives: formData.objectives.filter(item => item.trim() !== '')
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success alert
      setAlert({
        type: 'success',
        message: `Course ${isEditMode ? 'updated' : 'created'} successfully`
      });
      
      // Navigate after delay
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${isEditMode ? 'update' : 'create'} course: ${err.message}`
      });
      setSaving(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center p-8">Loading course data...</div>;
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
        {isEditMode ? 'Edit Course' : 'Create New Course'}
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
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32"
              placeholder="Enter course description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
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
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Price ($)
            </label>
            <input
              type="text"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              placeholder="Enter discount price (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor Name *
            </label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter instructor name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="E.g. 8 weeks, 10 hours"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Thumbnail
            </label>
            <div className="border rounded p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full"
              />
              {currentThumbnail && (
                <div className="mt-2 flex items-center space-x-4">
                  <img 
                    src={currentThumbnail.url} 
                    alt="Course thumbnail preview" 
                    className="w-24 h-24 object-cover rounded" 
                  />
                  <p className="text-sm">{currentThumbnail.name}</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 1280×720 pixels (16:9 ratio)
              </p>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayItemChange(index, 'requirements', e.target.value)}
                  className="flex-grow p-2 border rounded"
                  placeholder="Enter course requirement"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('requirements', index)}
                  className="ml-2 px-3 py-2 bg-red-50 text-red-500 rounded hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="mt-1 px-3 py-2 bg-blue-50 text-blue-500 rounded hover:bg-blue-100"
            >
              Add Requirement
            </button>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Learning Objectives
            </label>
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleArrayItemChange(index, 'objectives', e.target.value)}
                  className="flex-grow p-2 border rounded"
                  placeholder="Enter learning objective"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('objectives', index)}
                  className="ml-2 px-3 py-2 bg-red-50 text-red-500 rounded hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('objectives')}
              className="mt-1 px-3 py-2 bg-blue-50 text-blue-500 rounded hover:bg-blue-100"
            >
              Add Objective
            </button>
          </div>

          <div className="col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Publish course (make it visible to users)
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/courses')}
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
                ? 'Update Course'
                : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm; 