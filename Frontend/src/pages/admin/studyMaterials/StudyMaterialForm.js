import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import apiService from '../../../services/apiService';

const StudyMaterialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'PDF',
    tags: [],
    file: null,
    currentFile: null
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Cloud Computing',
    'Mobile Development',
    'Web Development',
    'UI/UX Design',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Blockchain',
    'Algorithms',
    'System Design',
    'Programming Languages'
  ];

  const materialTypes = [
    'PDF',
    'Video',
    'Interactive',
    'Audio',
    'Code Sample',
    'Presentation'
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchStudyMaterial();
    }
  }, [id]);

  const fetchStudyMaterial = async () => {
    setFetchLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        if (id === '1') {
          setFormData({
            title: 'React Hooks Complete Guide',
            description: 'A comprehensive guide to using React Hooks with examples and best practices.',
            category: 'Frontend',
            type: 'PDF',
            tags: ['React', 'Hooks', 'JavaScript'],
            file: null,
            currentFile: {
              name: 'react-hooks-guide.pdf',
              size: '2.4 MB'
            }
          });
        } else if (id === '2') {
          setFormData({
            title: 'Docker and Kubernetes Fundamentals',
            description: 'Learn the basics of containerization with Docker and orchestration with Kubernetes.',
            category: 'DevOps',
            type: 'Video',
            tags: ['Docker', 'Kubernetes', 'Container'],
            file: null,
            currentFile: {
              name: 'docker-kubernetes-fundamentals.mp4',
              size: '145 MB'
            }
          });
        } else {
          setError('Study material not found');
        }
        setFetchLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch study material details');
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        file: file,
        currentFile: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        }
      }));
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prevData => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter((_, index) => index !== indexToRemove)
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
    
    if (!isEditMode && !formData.file) {
      setAlert({
        type: 'error',
        message: 'File is required'
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
        message: `Study material ${isEditMode ? 'updated' : 'created'} successfully`
      });
      
      // Navigate after delay
      setTimeout(() => {
        navigate('/admin/study-materials');
      }, 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${isEditMode ? 'update' : 'create'} study material: ${err.message}`
      });
      setSaving(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center p-8">Loading study material data...</div>;
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
        {isEditMode ? 'Edit Study Material' : 'Upload New Study Material'}
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
              placeholder="Enter material title"
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
              placeholder="Enter material description"
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
              Material Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                className="flex-grow p-2 border rounded"
                placeholder="Add tags and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                  <span className="mr-1">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File {!isEditMode && '*'}
            </label>
            <div className="border rounded p-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {formData.currentFile && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <p className="text-sm">Current file: {formData.currentFile.name} ({formData.currentFile.size})</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Allowed file types depend on selected material type. Max size: 100MB.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/study-materials')}
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
                ? 'Update Study Material'
                : 'Upload Study Material'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudyMaterialForm; 