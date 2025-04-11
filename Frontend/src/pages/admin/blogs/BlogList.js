import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'Getting Started with React Hooks',
            slug: 'getting-started-with-react-hooks',
            category: 'React',
            author: 'John Doe',
            excerpt: 'Learn how to use React Hooks to simplify your functional components.',
            tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
            published: true,
            featured: true,
            readTime: '5 min',
            createdAt: '2023-05-15',
            updatedAt: '2023-05-20',
            comments: 12,
            views: 1250
          },
          {
            id: 2,
            title: 'Understanding JavaScript Promises',
            slug: 'understanding-javascript-promises',
            category: 'JavaScript',
            author: 'Jane Smith',
            excerpt: 'A comprehensive guide to JavaScript Promises and async/await.',
            tags: ['JavaScript', 'Promises', 'Async', 'ES6'],
            published: true,
            featured: false,
            readTime: '8 min',
            createdAt: '2023-04-28',
            updatedAt: '2023-05-02',
            comments: 8,
            views: 980
          },
          {
            id: 3,
            title: 'CSS Grid vs Flexbox: When to Use What',
            slug: 'css-grid-vs-flexbox-when-to-use-what',
            category: 'CSS',
            author: 'Michael Johnson',
            excerpt: 'Learn the key differences between CSS Grid and Flexbox and when to use each one.',
            tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Frontend'],
            published: true,
            featured: false,
            readTime: '6 min',
            createdAt: '2023-05-10',
            updatedAt: '2023-05-10',
            comments: 5,
            views: 720
          },
          {
            id: 4,
            title: 'Building RESTful APIs with Node.js and Express',
            slug: 'building-restful-apis-with-nodejs-and-express',
            category: 'Node.js',
            author: 'Sarah Williams',
            excerpt: 'Step-by-step guide to create robust RESTful APIs using Node.js and Express.',
            tags: ['Node.js', 'Express', 'API', 'Backend', 'REST'],
            published: false,
            featured: false,
            readTime: '10 min',
            createdAt: '2023-05-18',
            updatedAt: '2023-05-19',
            comments: 0,
            views: 0
          }
        ];
        setBlogs(mockData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
      setLoading(false);
    }
  };

  // Delete blog post handlers
  const handleDeleteClick = (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBlogs(prevBlogs => 
        prevBlogs.filter(blog => blog.id !== deleteModal.id)
      );
      
      setDeleteModal({ open: false, id: null });
      setAlert({
        type: 'success',
        message: 'Blog post deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete blog post'
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
      
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === id ? { ...blog, published: !currentStatus } : blog
        )
      );
      
      setAlert({
        type: 'success',
        message: `Blog post ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update blog post status'
      });
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id, currentStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === id ? { ...blog, featured: !currentStatus } : blog
        )
      );
      
      setAlert({
        type: 'success',
        message: `Blog post ${currentStatus ? 'removed from' : 'set as'} featured successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update blog post featured status'
      });
    }
  };

  // Get unique categories for filter
  const categories = [...new Set(blogs.map(blog => blog.category))];

  // Filter blogs by search term and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory ? blog.category === filterCategory : true;
    
    return matchesSearch && matchesCategory;
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
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link to="/admin/blogs/new">
          <Button variant="primary">Create New Post</Button>
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
              placeholder="Search by title, excerpt, author or tags..."
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-64">
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
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No blog posts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory 
              ? "Try adjusting your search or filter criteria." 
              : "Get started by creating a new blog post."}
          </p>
          {!searchTerm && !filterCategory && (
            <div className="mt-6">
              <Link to="/admin/blogs/new">
                <Button variant="primary">Create New Post</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      {blog.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {blog.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>By {blog.author} • {formatDate(blog.createdAt)}</span>
                      {blog.createdAt !== blog.updatedAt && (
                        <span> • Updated {formatDate(blog.updatedAt)}</span>
                      )}
                      <span> • {blog.readTime} read</span>
                      {blog.published && (
                        <span> • {blog.views} views • {blog.comments} comments</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link to={`/admin/blogs/${blog.id}/edit`}>
                    <Button variant="light" size="sm">Edit</Button>
                  </Link>
                  <Button 
                    variant={blog.featured ? "warning" : "light"} 
                    size="sm"
                    onClick={() => toggleFeatured(blog.id, blog.featured)}
                  >
                    {blog.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button 
                    variant={blog.published ? "warning" : "success"} 
                    size="sm"
                    onClick={() => togglePublish(blog.id, blog.published)}
                  >
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(blog.id)}
                  >
                    Delete
                  </Button>
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
          <p className="mb-6">Are you sure you want to delete this blog post? This action cannot be undone and will remove all associated comments.</p>
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

export default BlogList; 