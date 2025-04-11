import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './ArticleManager.css';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const initialFormState = {
    title: '',
    content: '',
    category: '',
    tags: '',
    published: false
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentArticle 
        ? `/api/articles/${currentArticle.id}`
        : '/api/articles';
      
      const method = currentArticle ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save article');
      
      await fetchArticles();
      setShowForm(false);
      setFormData(initialFormState);
      setCurrentArticle(null);
    } catch (err) {
      setError('Failed to save article');
      console.error('Error saving article:', err);
    }
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      published: article.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete article');
      
      await fetchArticles();
    } catch (err) {
      setError('Failed to delete article');
      console.error('Error deleting article:', err);
    }
  };

  if (loading) return <div className="loading">Loading articles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="article-manager">
      <div className="article-manager-header">
        <h1>Article Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setCurrentArticle(null);
            setFormData(initialFormState);
          }}
        >
          <FaPlus /> New Article
        </button>
      </div>

      {showForm && (
        <div className="article-form">
          <h2>{currentArticle ? 'Edit Article' : 'New Article'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                />
                Published
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {currentArticle ? 'Update' : 'Create'} Article
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setCurrentArticle(null);
                  setFormData(initialFormState);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="articles-list">
        {articles.length === 0 ? (
          <p className="no-articles">No articles found. Create one to get started!</p>
        ) : (
          articles.map(article => (
            <div key={article.id} className="article-item">
              <div className="article-info">
                <h3>{article.title}</h3>
                <p className="article-meta">
                  Category: {article.category} | 
                  Tags: {article.tags.join(', ')} |
                  Status: <span className={article.published ? 'published' : 'draft'}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </p>
              </div>
              <div className="article-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(article)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(article.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleManager; 