import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'Introduction to Data Structures',
            slug: 'introduction-to-data-structures',
            category: 'Computer Science',
            author: 'John Doe',
            excerpt: 'Learn the fundamental data structures that every programmer should know.',
            difficulty: 'Beginner',
            estimatedTime: '15 min',
            featured: true,
            published: true,
            relatedTopics: ['Algorithms', 'Programming Basics', 'Computer Science Fundamentals'],
            createdAt: '2023-05-15',
            updatedAt: '2023-05-20',
            views: 2340
          },
          {
            id: 2,
            title: 'Advanced JavaScript Design Patterns',
            slug: 'advanced-javascript-design-patterns',
            category: 'Web Development',
            author: 'Jane Smith',
            excerpt: 'Explore advanced design patterns to improve your JavaScript code structure.',
            difficulty: 'Advanced',
            estimatedTime: '25 min',
            featured: false,
            published: true,
            relatedTopics: ['JavaScript', 'Software Design', 'Web Development'],
            createdAt: '2023-04-28',
            updatedAt: '2023-05-02',
            views: 1450
          },
          {
            id: 3,
            title: 'Understanding Big O Notation',
            slug: 'understanding-big-o-notation',
            category: 'Algorithms',
            author: 'Michael Johnson',
            excerpt: 'A clear explanation of Big O notation and why it matters for algorithm efficiency.',
            difficulty: 'Intermediate',
            estimatedTime: '20 min',
            featured: false,
            published: true,
            relatedTopics: ['Algorithms', 'Computer Science', 'Mathematics'],
            createdAt: '2023-05-10',
            updatedAt: '2023-05-10',
            views: 1820
          },
          {
            id: 4,
            title: 'Machine Learning Fundamentals',
            slug: 'machine-learning-fundamentals',
            category: 'Artificial Intelligence',
            author: 'Sarah Williams',
            excerpt: 'An introduction to the basic concepts and algorithms in machine learning.',
            difficulty: 'Intermediate',
            estimatedTime: '30 min',
            featured: true,
            published: false,
            relatedTopics: ['AI', 'Data Science', 'Statistics', 'Python'],
            createdAt: '2023-05-18',
            updatedAt: '2023-05-19',
            views: 0
          }
        ];
        setArticles(mockData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
      setLoading(false);
    }
  };

  // Delete article handlers
  const handleDeleteClick = (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setArticles(prevArticles => 
        prevArticles.filter(article => article.id !== deleteModal.id)
      );
      
      setDeleteModal({ open: false, id: null });
      setAlert({
        type: 'success',
        message: 'Article deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete article'
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, id: null });
  };

  // Toggle publish status
  const togglePublish = async (id, currentStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setArticles(prevArticles => 
        prevArticles.map(article => 
          article.id === id ? { ...article, published: !currentStatus } : article
        )
      );
      
      setAlert({
        type: 'success',
        message: `Article ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update article status'
      });
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id, currentStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setArticles(prevArticles => 
        prevArticles.map(article => 
          article.id === id ? { ...article, featured: !currentStatus } : article
        )
      );
      
      setAlert({
        type: 'success',
        message: `Article ${currentStatus ? 'removed from' : 'set as'} featured successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update article featured status'
      });
    }
  };

  // Get unique categories and difficulty levels for filters
  const categories = [...new Set(articles.map(article => article.category))];
  const difficulties = [...new Set(articles.map(article => article.difficulty))];

  // Filter articles by search term, category, and difficulty
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.relatedTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory ? article.category === filterCategory : true;
    const matchesDifficulty = filterDifficulty ? article.difficulty === filterDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Educational Articles</h1>
        <Link to="/admin/articles/new">
          <Button variant="primary">Create New Article</Button>
        </Link>
      </div>

      {alert && (
        <div className="mb-4">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex-1">
            <input
              type="text"
              placeholder="Search by title, excerpt, author or related topics..."
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="w-full p-2 border rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              className="w-full p-2 border rounded"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="">All Difficulties</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory || filterDifficulty
              ? "Try adjusting your search or filter criteria." 
              : "Get started by creating a new educational article."}
          </p>
          {!searchTerm && !filterCategory && !filterDifficulty && (
            <div className="mt-6">
              <Link to="/admin/articles/new">
                <Button variant="primary">Create New Article</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {article.category}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {article.difficulty}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.relatedTopics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>By {article.author} • {formatDate(article.createdAt)}</span>
                      {article.createdAt !== article.updatedAt && (
                        <span> • Updated {formatDate(article.updatedAt)}</span>
                      )}
                      <span> • {article.estimatedTime} read</span>
                      {article.published && (
                        <span> • {article.views} views</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Link to={`/admin/articles/${article.id}/edit`}>
                      <Button variant="light" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant={article.featured ? "warning" : "light"} 
                      size="sm"
                      onClick={() => toggleFeatured(article.id, article.featured)}
                    >
                      {article.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Button 
                      variant={article.published ? "warning" : "success"} 
                      size="sm"
                      onClick={() => togglePublish(article.id, article.published)}
                    >
                      {article.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteClick(article.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={cancelDelete}
        title="Confirm Delete"
        size="small"
      >
        <div className="p-6">
          <p className="mb-6">Are you sure you want to delete this educational article? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={cancelDelete}>
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

export default ArticleList;
