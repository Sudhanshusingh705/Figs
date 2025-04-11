import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import apiService from '../../../services/apiService';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    difficulty: 'Beginner',
    excerpt: '',
    content: '',
    estimatedTime: '',
    relatedTopics: [],
    featured: false,
    published: false,
    featuredImage: null
  });

  const [topicInput, setTopicInput] = useState('');
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  // Categories options
  const categories = [
    'Computer Science',
    'Web Development',
    'Algorithms',
    'Artificial Intelligence',
    'Data Science',
    'Mobile Development',
    'DevOps',
    'Database',
    'Security',
    'Software Engineering',
    'Mathematics',
    'Programming Languages'
  ];

  // Difficulty levels
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    if (isEditMode) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        if (id === '1') {
          const mockData = {
            id: 1,
            title: 'Introduction to Data Structures',
            slug: 'introduction-to-data-structures',
            category: 'Computer Science',
            author: 'John Doe',
            excerpt: 'Learn the fundamental data structures that every programmer should know.',
            content: 'This is a detailed guide about data structures including arrays, linked lists, stacks, queues, trees, and graphs...',
            difficulty: 'Beginner',
            estimatedTime: '15 min',
            featured: true,
            published: true,
            relatedTopics: ['Algorithms', 'Programming Basics', 'Computer Science Fundamentals'],
            featuredImage: 'https://via.placeholder.com/800x400?text=Data+Structures',
            createdAt: '2023-05-15',
            updatedAt: '2023-05-20'
          };
          
          setFormData({
            title: mockData.title,
            slug: mockData.slug,
            category: mockData.category,
            difficulty: mockData.difficulty,
            excerpt: mockData.excerpt,
            content: mockData.content,
            estimatedTime: mockData.estimatedTime,
            relatedTopics: mockData.relatedTopics,
            featured: mockData.featured,
            published: mockData.published,
            featuredImage: null
          });
          
          setFeaturedImagePreview(mockData.featuredImage);
          setLoading(false);
        } else if (id === '2') {
          const mockData = {
            id: 2,
            title: 'Advanced JavaScript Design Patterns',
            slug: 'advanced-javascript-design-patterns',
            category: 'Web Development',
            author: 'Jane Smith',
            excerpt: 'Explore advanced design patterns to improve your JavaScript code structure.',
            content: 'This article covers various JavaScript design patterns including Singleton, Factory, Observer, and more...',
            difficulty: 'Advanced',
            estimatedTime: '25 min',
            featured: false,
            published: true,
            relatedTopics: ['JavaScript', 'Software Design', 'Web Development'],
            featuredImage: 'https://via.placeholder.com/800x400?text=JavaScript+Design+Patterns',
            createdAt: '2023-04-28',
            updatedAt: '2023-05-02'
          };
          
          setFormData({
            title: mockData.title,
            slug: mockData.slug,
            category: mockData.category,
            difficulty: mockData.difficulty,
            excerpt: mockData.excerpt,
            content: mockData.content,
            estimatedTime: mockData.estimatedTime,
            relatedTopics: mockData.relatedTopics,
            featured: mockData.featured,
            published: mockData.published,
            featuredImage: null
          });
          
          setFeaturedImagePreview(mockData.featuredImage);
          setLoading(false);
        } else {
          setError('Article not found');
          setLoading(false);
        }
      }, 800);
    } catch (err) {
      setError('Failed to fetch article data');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'title' && !isEditMode) {
      // Auto-generate slug from title
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleTopicInputChange = (e) => {
    setTopicInput(e.target.value);
  };

  const handleTopicInputKeyDown = (e) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      e.preventDefault();
      if (!formData.relatedTopics.includes(topicInput.trim())) {
        setFormData(prev => ({
          ...prev,
          relatedTopics: [...prev.relatedTopics, topicInput.trim()]
        }));
      }
      setTopicInput('');
    }
  };

  const addTopic = () => {
    if (topicInput.trim() && !formData.relatedTopics.includes(topicInput.trim())) {
      setFormData(prev => ({
        ...prev,
        relatedTopics: [...prev.relatedTopics, topicInput.trim()]
      }));
      setTopicInput('');
    }
  };

  const removeTopic = (topicToRemove) => {
    setFormData(prev => ({
      ...prev,
      relatedTopics: prev.relatedTopics.filter(topic => topic !== topicToRemove)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        featuredImage: file
      }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFeaturedImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: null
    }));
    setFeaturedImagePreview(null);
  };

  const validateForm = () => {
    if (!formData.title) return 'Title is required';
    if (!formData.slug) return 'Slug is required';
    if (!formData.category) return 'Category is required';
    if (!formData.difficulty) return 'Difficulty level is required';
    if (!formData.excerpt) return 'Excerpt is required';
    if (!formData.content) return 'Content is required';
    if (!formData.estimatedTime) return 'Estimated reading time is required';
    if (formData.relatedTopics.length === 0) return 'At least one related topic is required';
    if (!featuredImagePreview) return 'Featured image is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setAlert({
        type: 'error',
        message: validationError
      });
      return;
    }
    
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setAlert({
        type: 'success',
        message: `Article ${isEditMode ? 'updated' : 'created'} successfully!`
      });
      
      // Wait for alert to be shown before navigating away
      setTimeout(() => {
        navigate('/admin/articles');
      }, 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${isEditMode ? 'update' : 'create'} article: ${err.message}`
      });
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert type="error" message={error} />
        <div className="mt-4">
          <Link to="/admin/articles">
            <Button variant="secondary">Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? 'Edit Article' : 'Create New Article'}
        </h1>
        <Link to="/admin/articles">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>

      {alert && (
        <div className="mb-6">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - left 2/3 */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter article title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter-url-friendly-slug"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                URL-friendly identifier. Auto-generated from title but can be edited.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief summary of the article"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                A short summary that appears in article listings (max 200 characters).
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="12"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your article content here..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Full content of the article. Supports Markdown formatting.
              </p>
            </div>
          </div>

          {/* Sidebar - right 1/3 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level *
              </label>
              <div className="flex gap-4">
                {difficultyLevels.map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={formData.difficulty === level}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Reading Time *
              </label>
              <input
                type="text"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 10 min"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Related Topics *
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={topicInput}
                  onChange={handleTopicInputChange}
                  onKeyDown={handleTopicInputKeyDown}
                  className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a related topic"
                />
                <button
                  type="button"
                  onClick={addTopic}
                  className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.relatedTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="text-sm">{topic}</span>
                    <button
                      type="button"
                      onClick={() => removeTopic(topic)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {formData.relatedTopics.length === 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  Add at least one related topic to categorize your article.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image *
              </label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4">
                {featuredImagePreview ? (
                  <div>
                    <img
                      src={featuredImagePreview}
                      alt="Featured preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="mt-2 text-red-500 text-sm"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a featured image for your article
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-4 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Article
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publish immediately
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid mr-2"></div>
                    <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                  </div>
                ) : (
                  isEditMode ? 'Update Article' : 'Create Article'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm; 